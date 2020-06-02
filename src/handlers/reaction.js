"use strict";
// Thanks Kinolite#0001 :GWcmeisterPeepoLove:
const EventEmitter = require("events");

/**
 * @typedef {import("../KyoukoTomato.js")} Client
 */
/**
 * Represents a reaction collector for waiting for reactions to be added,
 * removed or bulk removed from a message.
 * @param {Client} client The client instance.
 * @param {Function} filter The filter to run on each reaction.
 * @param {Object} options Options to pass for the collector.
 * @param {Boolean} ended Whether the reaction collector has ended.
 * @param {Array<Object>} collected An array of objects listing the message origin, emoji,
 * user ID and the type (add, remove, removeAll) for all reactions passing the filter.
 */
class ReactionCollector extends EventEmitter {
    /**
     * Initializes the reaction collector.
     * @param {Client} client The client instance.
     * @param {Function} filter The function to run over each reaction update.
     * @param {Object} options Options to pass for the collector.
     * @param {Number} [options.time] The maximum time to leave the reaction collector running
     * in milliseconds.
     * @param {Array<String>} [options.allowedTypes] The allowed listener types for the collector.
     * @param {String} [options.messageID] The message ID to limit the reaction collector to.
     * @param {Number} [options.maxMatches=Infinity] The maximum number of reactions to collect
     * before ending.
     */
    constructor(client, filter, options) {
        super();

        this.client = client;
        this.filter = filter;
        this.options = Object.assign({
            time: 30000,
            maxMatches: Infinity,
            allowedTypes: ["add", "remove", "removeAll"]
        }, options);
        this.ended = false;
        this.collected = [];
        this._timeout = options.time ? setTimeout(() => this.stop("time"), options.time) : null;

        this._handleReactionAdd = (...args) => this.check(...args, "add");
        this._handleReactionRemove = (...args) => this.check(...args, "remove");
        this._handleReactionRemoveAll = (...args) => this.check(...args, "removeAll");

        for (const allowedType of this.options.allowedTypes) {
            let type = allowedType.charAt(0).toUpperCase() + allowedType.substring(1);

            this.client.on(`messageReaction${type}`, this[`_handleReaction${type}`]);
        }
    }

    /**
     * Check if the reaction passes the filter.
     * @param {Message} message The message the reaction was added to.
     * @param {Object} emoji The emoji object.
     * @param {String} userID The ID of the user adding the reaction.
     * @param {String} type Whether the reaction was added, removed, or bulk removed on the message.
     * @returns {Boolean} Whether the reaction passes the filter.
     */
    check(message, emoji, userID, type) {
        if (this.options.messageID && this.options.messageID !== message.id) {
            return false;
        }

        if (this.filter(message, emoji, userID, type)) {
            let cleanType = type.charAt(0).toUpperCase() + type.substring(1);

            this.collected.push({ message, emoji, userID, type });
            this.emit(`reaction${cleanType}`, message, emoji, userID);

            //reseting timeout//
            clearTimeout(this._timeout)
            this._timeout=setTimeout(() => this.stop("time"), this.options.time);

            if (this.collected.length >= this.options.maxMatches) this.stop("maxMatches");

            return true;
        }

        return false;
    }

    /**
     * Stops the reaction collector.
     * @param {String} reason The reason to use on the `end` event.
     * @returns {Boolean} A boolean signaling if the reaction ended. False when the
     * collector already ended.
     */
    stop(reason) {
        if (this.ended) return false;

        if (this._timeout) clearTimeout(this._timeout);

        this.ended = true;
        this.client.removeListener("messageReactionAdd", this._handleReactionAdd);
        this.client.removeListener("messageReactionRemove", this._handleReactionRemove);
        this.client.removeListener("messageReactionRemoveAll", this._handleReactionRemoveAll);
        this.emit("end", this.collected, reason);
        this.removeAllListeners();

        return true;
    }
}

module.exports = ReactionCollector;

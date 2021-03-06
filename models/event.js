const mongoose = require('mongoose');
const config = require('../config/env');
const pagination = require('mongoose-paginate');

// Event Schema
const EventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    department_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_name: {
        type: String,
        required: true
    },
    rules: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    event_date: {
        type: String,
        required: true
    },
    prelims: {
        type: String
    },
    round_1: {
        type: String
    },
    round_2: {
        type: String
    },
    finals: {
        type: String
    },
    min_members: {
        type: Number
    },
    max_members: {
        type: Number
    },
    max_limit: {
        type: Number
    },
    contact_email: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    allow_gender_mixing: {
        type: String,
        required: true
    }

});
EventSchema.plugin(pagination);
const Event = module.exports = mongoose.model('Event', EventSchema);
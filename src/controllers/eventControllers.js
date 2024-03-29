const eventModel = require('../models/eventModel');
const guestModel = require('../models/guestModel');
const subEventModel = require('../models/subEventModel');
const { v4: uuidv4 } = require('uuid');

const { Parser } = require('json2csv');

exports.downloadCsv = async (req, res) => {
    try {
        const data = await guestModel.find({ eventid: req.params.id })
        const event = await eventModel.findById(req.params.id);
        const fields = [, 'name', 'email', 'number', 'numberOfPeople', 'numberOfChildren', 'numberOfAdult', 'namesOfPeople', 'adhaar', 'travelPlan', 'travelItinerary', 'driver', 'driverStay', 'driverNumber', 'driverName', 'arrival', 'departure', 'pickupReq', 'rsvp']
        const jsons2csv = new Parser(fields);
        let arr = [];
        let name = '';
        data.forEach(e => {
            let b = [];
            let c = [];
            e.peopleDetails.forEach((d, i) => {
                // console.log(d.adhaar.videoUrl)
                if (i > 0) {
                    b.push(d.name);
                }
                else {
                    name = d.name;
                }
                c.push(d.adhaar.videoUrl)
            })
            let namesOfPeople = b.join(',')
            let adhaar = c.join(',')
            const { email, phoneNumber, driver, driverStay, driverName, driverNumber, arrival, departure, pickupReq, numberOfAdult, numberOfChildren, numberOfPeople, rsvp, travelItinerary, travelPlan } = e;
            arr.push({ name, email, phoneNumber, numberOfPeople, numberOfChildren, numberOfAdult, namesOfPeople, adhaar, travelPlan, travelItinerary, driver, driverStay, driverNumber, driverName, arrival, departure, pickupReq, rsvp });
        })
        const converted = jsons2csv.parse(arr);
        res.attachment(`${event.title}.csv`)
        res.status(200).send(converted);
        // console.log(converted);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, msg: "some error occured" });
    }
}

exports.getTrueEvent = async (req, res) => {
    try {
        const resData = await eventModel.find({ ourEvent: true });
        res.status(200).json({ success: true, resData });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, msg: "some error occured" });
    }
}

exports.addEvent = async (req, res) => {
    // console.log(req.body)
    try {
        let event = await eventModel.create({ ...req.body.event, eventType: 'marriage' })
        if (req.body.subEvent) {
            req.body.subEvent.forEach((e) => {
                subEventModel.create({ ...e, eventid: event._id })
            })
        }
        res.status(200).json({ success: true, msg: "Event Added" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, msg: "some error occured" });
    }
}



exports.viewEvent = async (req, res) => {
    try {
        const event = await eventModel.findById(req.params.id);
        if (!event) {
            res.status(404).send({ success: false, msg: 'Not Found' });
        }
        const subEvent = await subEventModel.find({ eventid: event._id })
        // console.log(event)
        return res.json({ success: true, event, subEvent });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, msg: "some error occured" });
    }
}

exports.viewAllEvent = async (req, res) => {
    try {
        const event = await eventModel.find()
        if (!event) {
            res.status(404).send({ success: false, msg: 'Not Found' });
        }
        // console.log(event)
        return res.json({ success: true, event });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, msg: "some error occured" });
    }
}

exports.editEvent = async (req, res) => {
    try {
        let event = await eventModel.findById(req.params.id);
        if (!event) return res.status(404).send({ success: false, msg: "Not Found !!" });

        event = await eventModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, event });

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, msg: "some error occured" });
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        let event = await eventModel.findById(req.params.id);
        if (!event) return res.status(404).send({ success: false, msg: "Not Found !!" });

        event = await eventModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, msg: 'deleted successfully ' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: "some error occured" });
    }
}
exports.subEventImageUpload = async (req, res) => {
    try{
        let subEvent = await subEventModel.findById(req.body.subEventId);
        if(!subEvent) return res.status(404).send({success:false, msg : 'Event Not Found!'});
        let newImageArray = subEvent.pics.concat(req.body.pics);
        await subEventModel.findByIdAndUpdate(req.body.subEventId, {pics:newImageArray});
        return res.status(200).send({success:true, msg : 'pics uploaded successfully', pics:newImageArray})
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: "some error occured" });
    }
}
exports.subEventImageView = async (req, res) => {
    try{
        let subEvent = await subEventModel.findById(req.params.id);
        if(!subEvent) return res.status(404).send({success:false, msg : 'Event Not Found!'});
        return res.status(200).send({success:true, msg : 'Sub Event Data fetched successfully!', subEvent})
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: "some error occured" });
    }
}
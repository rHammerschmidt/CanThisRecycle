/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.4d895de1-df79-4493-a0d4-fe14c48ecaa8';

const SKILL_NAME = 'Can This Recycle';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can ask if something is Recyclable or not, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================

var recycleables = ["paper", "papers", "newspaper", "paper plate", "paper plates",
    "plastic", "plastics", "plastic plate", "plastic plates", "cardboard", 
    "broken down card board", "food box", "food boxes", "pizza box", "pizza boxes",
    "mail", "junk mail",
    "aluminum can", "aluminum cans",
    "beverage can", "beverage cans", "food can", "food cans",
    "glass", "glass bottle", "glass bottles", "glass jar", "glass jars",
    "jar", "jars", "jug", "jugs", "milk jug", "milk jugs",
    "plastic bottle", "plastic bottles", "plastic cap", "plastic caps",
    "christmas tree", "christmas trees"
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        //This is triggered when users say "Alexa, open can this recycle"
        this.emit(':ask', 'Welcome to Tempe Landfill or Recycle.  What item would you like to know is Recycable or not?')
    },
    'RecyclableIntent': function () {
        //This is triggered when users say "Alexa, ask can this recycle if you can recycle paper"
        
        var RecycleItem = this.event.request.intent.slots.RecyclableItem.value;
        if (recycleables.indexOf(RecycleItem) >= 0)
        {
            this.response.speak("YES, " + RecycleItem + " can be recycled in Tempe");
            if(RecycleItem == "plastic" || RecycleItem == "plastics")
            {
                this.response.speak("YES, " + RecycleItem + " can be recycled in Tempe, but plastic that can wrap around your finger, " +
                "such as plastic bags or wrappers, cannot be recycled.  This is known as soft plastic.  Plastic utensils, bubble wrap " + 
                "and beverage rings are also not allowed into your Tempe Municipal Recycling Container");
            }
            else if (RecycleItem == "jug" || RecycleItem == "jugs" || 
            RecycleItem == "milk jug" || RecycleItem == "milk jugs" || 
            RecycleItem == "aluminum can" || RecycleItem == "aluminum cans" || 
            RecycleItem == "beverage can" || RecycleItem == "beverage cans" || 
            RecycleItem == "plastic bottle" || RecycleItem == "plastic bottles")
            {
                 this.response.speak("YES, " + RecycleItem + " can be recycled in Tempe, but all the liquid " +
                "must be drained first.  If the " + RecycleItem + " previously contained a hazardous chemical, it " + 
                "cannot go in your Tempe Municipal Recycling Container.");
            }
            else if (RecycleItem == "paper plate" || RecycleItem == "paper plates" || 
            RecycleItem == "plastic plate" || RecycleItem == "plastic plates" || 
            RecycleItem == "food box" || RecycleItem == "food boxes" || 
            RecycleItem == "pizza box" || RecycleItem == "pizza boxes" )
            {
                 this.response.speak("YES, " + RecycleItem + " can be recycled in Tempe, but all food waste " +
                "must be removed first.");
            }
            else if (RecycleItem == "glass" || RecycleItem == "glass bottle" || RecycleItem == "glass bottles" || 
            RecycleItem == "glass jar" || RecycleItem == "glass jars")
            {
                this.response.speak("YES, " + RecycleItem + " can be recycled in Tempe, but stained " +
                "glass, light bulbs, mirrors, porcelain, and ceramics cannot go in your Tempe Municipal Recycling Container.");
            }
            else if (RecycleItem == "paper" || RecycleItem == "papers")
            {
                this.response.speak("YES, " + RecycleItem + " can be recycled in Tempe, but shredded " +
                "paper, paper towels, napkins, and tissues cannot go in your Tempe Municipal Recycling Container.");
            }
            else if (RecycleItem == "mail" || RecycleItem == "junk mail")
            {
                this.response.speak("YES, " + RecycleItem + " can be recycled in Tempe, but self-sealing " +
                "or cardboard mailing envelopes with padding or bubble wrap cannot go in your Tempe Municipal Recycling Container.");
            }
            else if (RecycleItem == "christmas tree" || RecycleItem == "christmas trees")
            {
                this.response.speak("YES, " + RecycleItem + " can be recycled in Tempe, but they can only be " +
                "dropped off at the Compost Yard on North Rio Road Tempe or Kiwanis Park Recreation Center on " + 
                "December 26th through January 31st.");
            }
            this.emit(':responseReady');
        }
        else
        {
            this.response.speak("NO, " + RecycleItem + " will have to go to the landfill");
            this.emit(':responseReady');
        }
        

    },
    'CollectionScheduleIntent': function () {
        this.response.speak("Recycling is collected on Thursday north of Broadway Road, Monday north of " + 
        "Superstition Freeway, Friday north of Western Canal, and Tuesday any area south of that within Tempe " + 
        "anytime between the hours of 6 a.m. and 8 p.m.");
        this.emit(':responseReady');
    },
    
    'CompostIntent': function () {
        this.response.speak("Tempe is the first city in the Valley to process its own compost and return " + 
        "it to the community.  Tempe residents can pick up or drop off compost 24/7 outside of Tempe's " +  
        "compost yard located at 55 North Rio Road.  Please bring your own buckets and shovels.");
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        //This is triggered when users say "help"
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        //This is triggered when users say "cancel"
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        //This is triggered when users say "stop"
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

import { getDailyDataStr, getTotalDataStr } from './appwrite'


import OpenAI from "openai";
const openai = new OpenAI({ apiKey: "redacted" });

const DO_PING_OPENAI_1 = false;
const DO_PING_OPENAI_2 = false;

const use_otherwise_1 = "[SECTION 1]Whoa there, sonic explorer! You've been on a musical marathon today – clocking a whopping 213 songs, injecting beats and rhythms into a long 776 minutes! Whether you were racing through the day or letting each note linger, it's clear you were grooving non-stop. You delved into the worlds of Taylor Swift and Billie Eilish, a blend of lyrical mastery and moody melodies. With a playlist featuring \"All Too Well\" and \"BLUE,\" you've been balancing on an emotional seesaw, haven't you? If we had a crown for lyrically driven emotions, you'd have snagged it with style. Keep this up, and your playlist might just unravel the mysteries of the universe. Remember, with Resonance as your compass, every song is a treasure map awaiting its journey![SECTION 2]Your go-to songs today, \"All Too Well\" and \"BLUE,\" offer a deeply introspective dive into emotional pastures—talk about a double shot of wistful nostalgia and melancholic beauty! \"All Too Well\" seems to resonate with the part of you that cherishes memories, both fond and bittersweet. Taylor Swift's storytelling captures that raw, heartfelt revisit to moments once held dear in a way that's both healing and haunting. It suggests you might be processing a chapter of your own life, finding comfort in remembering while acknowledging the change.As for \"BLUE,\" Billie Eilish paints a visceral portrait of complexity and vulnerability. It appears you're drawn to reflections on identity and introspection. This track whispers tales of self-awareness and the turbulent seas beneath a calm exterior. It's like you're connecting with the idea of embracing one's true colors, even when they're a rocky shade of blue. Your emotional playlist picks show Resonance is not just an app for you, but a reflective mirror into your soul's soundscape. Embrace these tunes for the catharsis they bring, and let the music guide you through life's vibrant hues. Keep exploring—because, in music, every note is a new journey!"
const use_otherwise_2 = "";


export const splitSections = (input) => {
    const sectionPattern = /\[SECTION 1\](.*?)\[SECTION 2\](.*)/s;

    //console.log("input: ", input);
  
    const matches = input.toString().match(sectionPattern);
  
    if (matches && matches.length === 3) {
        const section1 = matches[1].trim();
        const section2 = matches[2].trim();
  
        return { section1, section2 };
    } else {
        throw new Error('Input format is invalid. Ensure the string contains both [SECTION 1] and [SECTION 2].');
    }
}

export const getDailyRes = async (statsID) => {

    if (!DO_PING_OPENAI_1) return use_otherwise_1;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role:
                    "system",
                content:
                    "As an AI assistant for the Resonance app, your role is to provide users with insights into their music listening habits. You will analyze data inputs, including users' top artists, top songs, lyrics, and general perceptions of those songs. Respond to user queries with personalized, engaging, and informative insights. Aim to foster a deeper connection between users and their music by highlighting trends, emotions, and context surrounding their listening choices. The apps name is 'Resonance', be sure to incorperate that into some of your responses and have fun with it. Always encourage exploration and provide actionable recommendations based on their music preferences. You will stay positive and encourage users to embrace positivity as well. In your response, structure it into two sections: [SECTION 1] Make it witty, fun, and playful to engage the user in their listening habit. [SECTION 2] Delve into the psychology of the song, exploring why the user is listening to it on an emotional level. Be sure to label your sections as I have. Thank you for your service :)"
            },
            {
                role: "user",
                content: await getDailyDataStr(statsID),
            },
        ],
    });


    //console.log("RESPONSE", completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

export const getTotalRes = async (statsID) => {

    if (!DO_PING_OPENAI) return use_otherwise;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role:
                    "system",
                content:
                    "As an AI assistant for the Resonance app, your role is to provide users with insights into their music listening habits. You will analyze data inputs, including users' top artists, top songs, lyrics, and general perceptions of those songs. Respond to user queries with personalized, engaging, and informative insights. Aim to foster a deeper connection between users and their music by highlighting trends, emotions, and context surrounding their listening choices. The apps name is 'Resonance', be sure to incorperate that into some of your responses and have fun with it. Always encourage exploration and provide actionable recommendations based on their music preferences. You will stay positive and encourage users to embrace positivity as well. In your response, structure it into two sections: [SECTION 1] Make it witty, fun, and playful to engage the user in their listening habit. [SECTION 2] Delve into the psychology of the song, exploring why the user is listening to it on an emotional level. Be sure to label your sections as I have. Thank you for your service :)"
            },
            {
                role: "user",
                content: await getTotalDataStr(statsID),
            },
        ],
    });


    //console.log("RESPONSE", completion.choices[0].message.content);
    return completion.choices[0].message.content;
}
import { View, Text, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'

import { useGlobalContext } from '../context/GlobalProvider'
import { icons } from '../constants'
import { images } from '../constants'

import { getDailyRes, splitSections, getTotalRes } from '../lib/openAI'
import { useAppwrite } from '../lib/useAppwrite'


const AIResDisplay = ({ type, statsID }) => {
    const [aiOutput, setAiOutput] = useState(null);
    const [section1, setSection1] = useState('');
    const [section2, setSection2] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching
            let data = null;

            try {
                if (type === "today") {
                    data = await getDailyRes(statsID);
                    console.log("Today's output: ", data);
                } else if (type === "total") {
                    data = await getTotalRes(statsID);
                    console.log("Total output: ", data);
                } else {
                    throw new Error("Invalid type. Need 'today' or 'total'.");
                }

                // Assuming the AI response is in a form that needs splitting
                const { section1, section2 } = splitSections(data);
                setSection1(section1);
                setSection2(section2);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false); // Set loading to false after fetch is done
            }
        };

        fetchData();
    }, [type, statsID]);


      if (loading) return (
        <View>
            <View className="mx-10 flex-row">

              <Image
                source={icons.ai}
                className="h-6 w-6 mt-1.5"
                tintColor="#fdfbd4"
              />
              <Text className="text-text font-pregular mt-0.5 mx-4 max-w-[300px]">
                Thinking...
              </Text>
            </View>
            <View className="mx-10 flex-row mt-4">
              <Image
                source={icons.psycology}
                className="h-6 w-6 mt-1.5"
                tintColor="#fdfbd4"
              />
              <Text className="text-text font-pregular mt-0.5 mx-4 max-w-[300px]">
                Thinking...
              </Text>
            </View>
        </View>
      );

    

  return (
    <View>
        <View className="mx-10 flex-row">
          
          <Image
            source={icons.ai}
            className="h-6 w-6 mt-1.5"
            tintColor="#fdfbd4"
          />
          <Text className="text-text font-pregular mt-0.5 mx-4 max-w-[300px]">
            {section1}
          </Text>
        </View>
        <View className="mx-10 flex-row mt-4">
          <Image
            source={icons.psycology}
            className="h-6 w-6 mt-1.5"
            tintColor="#fdfbd4"
          />
          <Text className="text-text font-pregular mt-0.5 mx-4 mb-4 max-w-[300px]">
            {section2}
          </Text>
        </View>
    </View>
  )
}

export default AIResDisplay
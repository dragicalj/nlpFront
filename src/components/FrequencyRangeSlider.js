import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
  Flex
} from '@chakra-ui/react';

function FrequencyRangeSlider({ onRangeChange }) {
    const [sliderValueFrom, setSliderValueFrom] = useState(0);
    const [sliderValueTo, setSliderValueTo] = useState(100);

    const handleSliderChange = () => {
      onRangeChange(sliderValueFrom, sliderValueTo);
    };
    
    useEffect(() => {
      onRangeChange(sliderValueFrom, sliderValueTo);
    }, [sliderValueFrom, sliderValueTo, onRangeChange]);

    return (
      <Box borderWidth="1px" borderRadius="md" p={4} borderColor="gray.200">
        
        <Flex align="center" mb={4}>
          <Text minW="50px">From:</Text>
          <Slider aria-label="slider-from" defaultValue={0} min={0} max={100} mr={2} flex="1" onChange={(val) => setSliderValueFrom(val)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
          <Input maxW="70px" value={`${sliderValueFrom}%`} isReadOnly />
        </Flex>
        <Flex align="center">
          <Text minW="50px">To:</Text>
          <Slider aria-label="slider-to" defaultValue={100} min={0} max={100} mr={2} flex="1" onChange={(val) => setSliderValueTo(val)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
          <Input maxW="70px" value={`${sliderValueTo}%`} isReadOnly />
        </Flex>
      </Box>
    );
  }

export default FrequencyRangeSlider;
import React from 'react';
import { Text } from 'react-native';
import { ms } from '../Utility/Scaling';
import { useTheme } from '../Utility/ThemeContext';
import Fonts from '../Utility/Fonts';


const CustomText = ({
    children,
    color,
    size = 16,
    font,
    align = 'left',
    numberOfLines,
    style,
    ...rest
}) => {
    const { colors } = useTheme();
    
    // Default values if not provided as props
    const finalColor = color || colors.textPrimary;
    const finalFont = font || Fonts.regular;

    return (
        <Text
            style={[
                {
                    color: finalColor,
                    fontSize: ms(size),
                    fontFamily: finalFont,
                    textAlign: align,
                },
                style,
            ]}
            numberOfLines={numberOfLines}
            {...rest}>
            {children}
        </Text>
    );
};

export default CustomText;


import React from 'react';
import { Image } from 'react-native';

class ImageTitle extends React.Component {
    render() {
        return (
            <Image 
                source={require('./img/kid-64.png')}
                style={{ width: 30, height: 30 }}
            />
            
        );
    }
}

export default ImageTitle;
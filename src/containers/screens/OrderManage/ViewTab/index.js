import React from 'react';
import {Button, Block, Text} from '../../../../components';

const ViewTab = () => {
  return (
    <Block>
      <Button
        margin={10}
        radius={10}
        row
        space={'between'}
        justifyCenter
        alignCenter
        backgroundColor={'#eee'}
        padding={20}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Block width={'75%'}>
          <Text
            size={18}
            color="blue"
            style={{fontWeight: 'bold'}}
            marginVertical={5}>
            Hello World
          </Text>
        </Block>
      </Button>
    </Block>
  );
};

export default ViewTab;

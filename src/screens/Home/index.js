import React, { useState } from 'react';
import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import {
    Container,
    Content,
    Card,
    CardHeader,
    CardContent,
    Title,
    Description,
    CardFooter,
    Annotation,
    CardButton

} from './styles';
import { MaterialIcons } from '@expo/vector-icons';

import Header from '../../components/Header/index';
import Tabs from '../../components/Tabs/index';
import Menu from '../../components/Menu/index';

export default function Home() {

    let offset = 0;
    const [isVisible, setIsVisible] = useState(true);
    const translateY = new Animated.Value(0);

    const animatedEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationY: translateY,
                }
            }
        ],
        { useNativeDriver: true },
    );

    function onHandleStateChanged(event) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            let opened = false;
            const { translationY } = event.nativeEvent;
            offset += translationY;

            if (translationY >= 100) {
                opened = true;

            } else {
                translateY.setValue(offset);
                translateY.setOffset(0);
                offset = 0;
            }

            Animated.timing(translateY, {
                toValue: opened ? 380 : 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                offset = opened ? 380 : 0;
                translateY.setOffset(offset);
                translateY.setValue(0);
            });

        }
    }

    function handleToggleVisibility(){
        setIsVisible((prevState)=>!prevState);
    }

    return (
        <Container>

            <Header>

            </Header>

            <Content>
                <Menu translateY={translateY} />
                <PanGestureHandler
                    onGestureEvent={animatedEvent}
                    onHandlerStateChange={onHandleStateChanged}
                >
                    <Card
                        style={{
                            transform: [{
                                translateY: translateY.interpolate({
                                    inputRange: [-200, 0, 380],
                                    outputRange: [-50, 0, 380],
                                    extrapolate: 'clamp'
                                }),
                            }]
                        }}
                    >
                        <CardHeader>
                            <MaterialIcons name="attach-money" size={28} color="#666" />
                            <CardButton onPress={handleToggleVisibility}>
                                <MaterialIcons name={isVisible ? "visibility-off" : "visibility"} size={28} color="#666" />
                            </CardButton>
                        </CardHeader>

                        <CardContent>
                            <Title>Saldo disponível</Title>
                            <Description>{isVisible ? "R$ 10.000": "R$ --.---" }</Description>
                        </CardContent>

                        <CardFooter>
                            <Annotation>
                                Transferência de 2.000 recebida de Regina hoje as 6:00 horas
                        </Annotation>
                        </CardFooter>
                    </Card>
                </PanGestureHandler>
            </Content>

            <Tabs translateY={translateY}></Tabs>
        </Container>

    );
}
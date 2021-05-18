import * as React from "react";
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {Plot} from "../components/Plot";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {useState} from "react";
import {Diagram} from "../components/Diagram";

const styles = StyleSheet.create({
    control: {
        width: '80%',
        maxWidth: '90%',
        marginBottom: '10%',
    },
    view: {
        flex: 1,
        alignItems: 'center',
        padding: "5%",
    }
})

const sin = (x: number) => Math.sin(x);

export const Graphics = () => {
    const [activeComponent, setActiveComponent] = useState(0);
    const {width, height} = Dimensions.get("window")
    return(
        <View style={styles.view}>
            <SegmentedControl
                style={styles.control}
                values={["Plot", "Diagram"]}
                selectedIndex={activeComponent}
                onChange={({ nativeEvent }) => {
                    setActiveComponent(nativeEvent.selectedSegmentIndex);
                }}/>
            {
                [
                    <Plot func={sin} interval={0.1} max={6.28} min={-6.28} height={height/5} width={width * 0.8}/>,
                    <Diagram/>
                ][activeComponent]
            }
        </View>
    )
}

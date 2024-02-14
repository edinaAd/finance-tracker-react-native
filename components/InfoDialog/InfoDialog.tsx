import * as React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { MessageType } from '../../types/MessageType.enum';



interface Props {
    type: MessageType;
    message: string;
    open: boolean;
}
const InfoDialog: React.FC<Props> = ({ type, message, open }) => {


    const [state, setState] = React.useState({ open })
    const onDismissSnackBar = () => setState({ ...state, open: false });

    return (
        <View style={[styles.container, { top: Platform.OS === 'ios' ? 60 : 20 }]}>
            <Snackbar
                visible={open}
                onDismiss={onDismissSnackBar}
                style={styles.snackbar}
                >
                <Text style={styles.messageText}>{message}</Text>
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '80%',
        zIndex: 9999,
        paddingTop: 100
    },
    snackbar: {
        backgroundColor: '#D93F62',
    },
    messageText: {
        fontWeight: 'bold',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },
});

export default InfoDialog;
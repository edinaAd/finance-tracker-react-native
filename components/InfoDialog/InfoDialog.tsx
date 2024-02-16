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

    const getSnackbarBackgroundColor = () => {
		switch (type) {
			case MessageType.ERROR:
				return '#D93F62'; 
			case MessageType.SUCCESS:
				return '#129B0F';
			default:
				return '#D93F62';
		}
	};

    return (
        <View style={[styles.container, { top: Platform.OS === 'ios' ? 60 : 20 }]}>
            <Snackbar
                visible={open}
                onDismiss={onDismissSnackBar}
                style={{backgroundColor: getSnackbarBackgroundColor()}}
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

    messageText: {
        fontWeight: 'bold',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },
});

export default InfoDialog;
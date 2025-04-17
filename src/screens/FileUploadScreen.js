import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

const FileUploadScreen = () => {
    const [uploadedData, setUploadedData] = useState(null);

    const handleFileUploadWeb = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const parsedData = parseCSV(fileContent);
                setUploadedData(parsedData);
                Alert.alert('Success', 'File uploaded and parsed successfully!');
            };
            reader.readAsText(file);
        }
    };

    const handleFileUploadMobile = async () => {
        try {
            const { default: DocumentPicker } = await import('react-native-document-picker');
            const file = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.plainText, DocumentPicker.types.csv],
            });

            const fileContent = await FileSystem.readAsStringAsync(file.uri);
            const parsedData = parseCSV(fileContent);
            setUploadedData(parsedData);

            Alert.alert('Success', 'File uploaded and parsed successfully!');
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Cancelled', 'File upload cancelled.');
            } else {
                Alert.alert('Error', `Failed to upload file: ${err.message}`);
            }
        }
    };

    const parseCSV = (content) => {
        const rows = content.split('\n');
        const headers = rows[0].split(',');
        const data = rows.slice(1).map((row) => {
            const values = row.split(',');
            return headers.reduce((acc, header, index) => {
                acc[header.trim()] = values[index]?.trim();
                return acc;
            }, {});
        });
        return data;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Bank Transactions</Text>
            {Platform.OS === 'web' ? (
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUploadWeb}
                    style={styles.fileInput}
                />
            ) : (
                <Button title="Upload CSV File" onPress={handleFileUploadMobile} />
            )}
            {uploadedData && (
                <View style={styles.dataContainer}>
                    <Text style={styles.dataTitle}>Uploaded Data:</Text>
                    {uploadedData.map((item, index) => (
                        <Text key={index} style={styles.dataText}>
                            {JSON.stringify(item)}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    fileInput: { marginTop: 10 },
    dataContainer: { marginTop: 20, width: '100%' },
    dataTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    dataText: { fontSize: 14, marginBottom: 5 },
});

export default FileUploadScreen;
import { StyleVariables } from "@/utils/constants/Colors";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ModalTemplate({
  children,
  modalTitle,
  isOpen,
  onClose,
}: {
  modalTitle: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          onRequestClose={onClose}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTop}>
                <Text style={styles.modalText}>{modalTitle} </Text>
                <Pressable style={styles.button} onPress={onClose}>
                  <Text>X</Text>
                </Pressable>
              </View>
              {children}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    backgroundColor: StyleVariables.color.dark_transparency,
  },
  modalTop: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalView: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: StyleVariables.color.white_default,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
    padding: 35,
  },
  button: {
    borderRadius: 20,
  },
  modalText: {
    fontWeight: "500",
    textTransform: "capitalize",
  },
});

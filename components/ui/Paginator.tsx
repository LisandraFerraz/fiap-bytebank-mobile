import { StyleVariables } from "@/utils/constants/Colors";
import { Pagination } from "@/utils/interfaces/pagination";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "./IconSymbol";

export const Paginator = ({
  totalItems,
  itemsPage,
  currentPage,
  nextPage,
}: Pagination) => {
  const [pagNumbers, setPagNumbers] = useState<number[]>([]);

  useEffect(() => {
    const numbers: number[] = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPage); i++) {
      numbers.push(i);
    }
    setPagNumbers(numbers);
  }, [totalItems, itemsPage]);

  return (
    <View style={styles.paginator_container}>
      <Pressable
        disabled={currentPage === 1}
        style={styles.default}
        onPress={() => (totalItems > 1 ? nextPage!(currentPage - 1) : "")}
      >
        <Icon color={StyleVariables.color.grey_font} name="arrow.left" />
      </Pressable>
      {pagNumbers.map((page) => (
        <Pressable
          key={page}
          onPress={() => nextPage!(page)}
          style={[styles.default, currentPage === page ? styles.active : ""]}
        >
          <Text
            style={
              currentPage === page ? styles.btn_txt : styles.btn_txt_active
            }
          >
            {page}
          </Text>
        </Pressable>
      ))}
      <Pressable
        disabled={currentPage === Math.ceil(totalItems / itemsPage)}
        style={styles.default}
        onPress={() => (totalItems > 1 ? nextPage!(currentPage + 1) : "")}
      >
        <Icon color={StyleVariables.color.grey_font} name="arrow.right" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  paginator_container: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  default: {
    fontWeight: 600,
    width: 40,
    height: 40,
    backgroundColor: StyleVariables.color.soft_transparency,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    color: StyleVariables.color.white_default,
    fontWeight: 600,
    backgroundColor: StyleVariables.color.dark_green_default,
  },
  btn_txt_active: {
    color: StyleVariables.color.grey_font,
  },
  btn_txt: {
    color: StyleVariables.color.white_default,
    fontWeight: 600,
  },
  skip_btn: {
    fontSize: 12,
  },
});

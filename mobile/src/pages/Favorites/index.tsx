import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import styles from "./styles";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  async function loadFavorites() {
    const response = await AsyncStorage.getItem("favorites");
    if (response) {
      const parsedFavorites = JSON.parse(response);
      setFavorites(parsedFavorites);
    }
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} isFavorite />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;

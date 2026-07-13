import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View, type ListRenderItem } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CountPill } from '@/components/ui/count-pill';
import {
  contentMaxWidth,
  useResponsiveGutter,
} from '@/components/ui/responsive-content';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { colors, spacing, type } from '@/constants/theme';
import {
  getExercisesByGroup,
  muscleGroups,
  type Exercise,
  type MuscleGroupId,
} from '@/data/exercises';

import { ExerciseListCard } from './components/exercise-list-card';

const groupOptions = muscleGroups.map((group) => ({
  id: group.id,
  label: group.title,
  accessibilityLabel: `${group.title} — ${group.subtitle}`,
}));

export function CatalogScreen() {
  const insets = useSafeAreaInsets();
  const gutter = useResponsiveGutter();
  const router = useRouter();
  const [groupId, setGroupId] = useState<MuscleGroupId>(muscleGroups[0].id);

  const group = muscleGroups.find((item) => item.id === groupId) ?? muscleGroups[0];
  const groupExercises = getExercisesByGroup(groupId);
  const openExercise = useCallback(
    (exerciseId: string) => {
      router.push({ pathname: '/exercise/[id]', params: { id: exerciseId } });
    },
    [router],
  );
  const renderExercise: ListRenderItem<Exercise> = useCallback(
    ({ item }) => (
      <ExerciseListCard
        exercise={item}
        onOpen={openExercise}
      />
    ),
    [openExercise],
  );

  return (
    <FlatList
      style={styles.screen}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        styles.content,
        {
          paddingHorizontal: gutter,
          paddingTop: process.env.EXPO_OS === 'ios' ? spacing.lg : insets.top + spacing.lg,
        },
      ]}
      data={groupExercises}
      keyExtractor={(item) => item.id}
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      updateCellsBatchingPeriod={40}
      windowSize={5}
      removeClippedSubviews={process.env.EXPO_OS === 'android'}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={type.display}>Mashqlar</Text>
          <Text style={type.bodyMd}>
            {"Mushak guruhini tanlang va texnikani aniq o'rganing."}
          </Text>

          <View style={styles.segmentWrap}>
            <SegmentedControl options={groupOptions} value={groupId} onChange={setGroupId} />
          </View>

          <View style={styles.groupRow}>
            <Text style={type.titleLg}>{group.title}</Text>
            <CountPill label={`${groupExercises.length} ta`} />
          </View>
        </View>
      }
      renderItem={renderExercise}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    width: '100%',
    maxWidth: contentMaxWidth,
    alignSelf: 'center',
    paddingBottom: spacing.xxl,
  },
  header: {
    gap: spacing.base,
    marginBottom: spacing.base,
  },
  segmentWrap: {
    marginTop: spacing.xs,
  },
  groupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
});

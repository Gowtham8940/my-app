import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useBatteryLevel } from '@/native/Battery';

function BatteryBadge() {
  const level = useBatteryLevel();
  const label = level == null ? '—' : `${level}%`;

  return (
    <ThemedView type="backgroundElement" style={styles.batteryBadge}>
      <ThemedText type="smallBold">🔋 {label}</ThemedText>
    </ThemedView>
  );
}

const NotesScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Notes</ThemedText>
          <BatteryBadge />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    paddingHorizontal: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
  },
  batteryBadge: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.four,
  },
});

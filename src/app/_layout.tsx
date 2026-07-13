import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular'
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium'
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold'
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold'
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono/500Medium'
import { useFonts } from 'expo-font'
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'

import { colors, fonts } from '@/constants/theme'

void SplashScreen.preventAutoHideAsync().catch(() => undefined)

const zaplanTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: colors.primary,
		background: colors.canvas,
		card: colors.canvas,
		text: colors.ink,
		border: colors.hairline,
		notification: colors.primary
	}
}

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		JetBrainsMono_500Medium
	})

	useEffect(() => {
		if (fontsLoaded || fontError) {
			void SplashScreen.hideAsync().catch(() => undefined)
		}
	}, [fontError, fontsLoaded])

	if (!fontsLoaded && !fontError) return null

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<ThemeProvider value={zaplanTheme}>
				<StatusBar style="dark" />
				<Stack
					screenOptions={{
						headerStyle: { backgroundColor: colors.canvas },
						headerTintColor: colors.ink,
						headerTitleStyle: { fontFamily: fonts.semibold },
						headerShadowVisible: false,
						// Orqaga tugmasida oldingi route nomi ("(tabs)") chiqmasin — faqat strelka.
						headerBackButtonDisplayMode: 'minimal',
						contentStyle: { backgroundColor: colors.canvas },
						freezeOnBlur: true
					}}
				>
					{/* title — iOS'da orqaga tugmasini bosib turganda chiqadigan menyu uchun. */}
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false, title: 'Zaplan' }}
					/>
					<Stack.Screen
						name="workout/[id]"
						options={{ title: "Mashg'ulot" }}
					/>
					<Stack.Screen
						name="exercise/[id]"
						options={{ title: 'Mashq' }}
					/>
				</Stack>
			</ThemeProvider>
		</SafeAreaProvider>
	)
}

// app/onboarding/genres.tsx - Usando OnboardingLayout
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OnboardingLayout } from '../../components/OnboardingLayout';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

const genres = [
    'Romance', 'Fantasy', 'Sci-Fi', 'Horror', 'Mystery', 'Thriller',
    'Psychology', 'Inspiration', 'Comedy', 'Action', 'Adventure',
    'Comics', 'Children\'s', 'Art & Photography', 'Food & Drink',
    'Biography', 'Science & Technology', 'Guide / How-to', 'Travel'
];

export default function OnboardingGenres() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { updateUser } = useUserStore();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const handleContinue = () => {
        updateUser({ favoriteGenres: selectedGenres });
        router.push('/onboarding/profile');
    };

    const handleSkip = () => {
        updateUser({ favoriteGenres: [] });
        router.push('/onboarding/profile');
    };

    const toggleGenre = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    return (
        <OnboardingLayout
            title="Choose the Book Genre You Like ❤️"
            subtitle="Select your preferred book genre for better recommendations, or you can skip it"
            progressWidth="75%"
            onContinue={handleContinue}
            onSkip={handleSkip}
            showSkip={true}
            continueDisabled={selectedGenres.length === 0}
        >
            <View style={styles.genresGrid}>
                {genres.map((genre) => (
                    <TouchableOpacity
                        key={genre}
                        style={[
                            styles.genreButton,
                            {
                                borderColor: selectedGenres.includes(genre)
                                    ? theme.colors.primary
                                    : theme.colors.border,
                                backgroundColor: selectedGenres.includes(genre)
                                    ? theme.colors.primary
                                    : 'transparent',
                            }
                        ]}
                        onPress={() => toggleGenre(genre)}
                    >
                        <Text style={[
                            styles.genreText,
                            {
                                color: selectedGenres.includes(genre)
                                    ? theme.colors.white
                                    : theme.colors.text,
                                fontWeight: selectedGenres.includes(genre) ? '600' : '500'
                            }
                        ]}>
                            {genre}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </OnboardingLayout>
    );
}

const styles = StyleSheet.create({
    genresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    genreButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 1,
        marginBottom: 4,
    },
    genreText: {
        fontSize: 14,
        textAlign: 'center',
    },
});
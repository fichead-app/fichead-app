// app/onboarding/genres.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
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

    const handleBack = () => {
        router.back();
    };

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
        <Layout>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={theme.colors.text}
                        />
                    </TouchableOpacity>

                    {/* Progress Bar */}
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, {
                            backgroundColor: theme.colors.primary,
                            width: '75%'
                        }]} />
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: theme.colors.text }]}>
                            Choose the Book Genre You Like ❤️
                        </Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                            Select your preferred book genre for better recommendations, or you can skip it
                        </Text>
                    </View>

                    <ScrollView
                        style={styles.genresContainer}
                        showsVerticalScrollIndicator={false}
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
                    </ScrollView>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Skip"
                        onPress={handleSkip}
                        variant="ghost"
                        style={styles.skipButton}
                    />
                    <Button
                        title="Continue"
                        onPress={handleContinue}
                        disabled={selectedGenres.length === 0}
                        style={styles.continueButton}
                    />
                </View>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
    content: {
        flex: 1,
    },
    titleContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    genresContainer: {
        flex: 1,
    },
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
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 24,
    },
    skipButton: {
        flex: 1,
    },
    continueButton: {
        flex: 1,
    },
});
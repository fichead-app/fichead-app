// app/onboarding/genres.tsx - Usando dados temporários
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OnboardingLayout } from '../../components/OnboardingLayout';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

const genres = [
    'Romance', 'Fantasia', 'Ficção Científica', 'Terror', 'Mistério', 'Suspense',
    'Psicologia', 'Inspiração', 'Comédia', 'Ação', 'Aventura',
    'Quadrinhos', 'Infantil', 'Arte & Fotografia', 'Comida & Bebida',
    'Biografia', 'Ciência & Tecnologia', 'Guia / How-to', 'Viagem'
];

export default function OnboardingGenres() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { tempUserData, updateTempUserData } = useUserStore();
    const [selectedGenres, setSelectedGenres] = useState<string[]>(
        tempUserData?.favoriteGenres || []
    );

    const handleContinue = () => {
        updateTempUserData({ favoriteGenres: selectedGenres });
        router.push('/onboarding/profile');
    };

    const handleSkip = () => {
        updateTempUserData({ favoriteGenres: [] });
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
            title="Escolha os Gêneros Literários que Você Gosta ❤️"
            subtitle="Selecione seus gêneros preferidos para receber recomendações melhores, ou você pode pular esta etapa"
            progressWidth="75%"
            onContinue={handleContinue}
            onSkip={handleSkip}
            showSkip={true}
            continueDisabled={false} // Permite continuar mesmo sem seleção
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

            {/* Info sobre seleção múltipla */}
            <View style={styles.infoContainer}>
                <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
                    Selecionado: {selectedGenres.length} gênero{selectedGenres.length !== 1 ? 's' : ''}
                    {selectedGenres.length > 0 && ` (${selectedGenres.join(', ')})`}
                </Text>
            </View>
        </OnboardingLayout>
    );
}

const styles = StyleSheet.create({
    genresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
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
    infoContainer: {
        marginTop: 16,
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        borderRadius: 8,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        textAlign: 'center',
    },
});

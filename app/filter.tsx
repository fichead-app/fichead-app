// app/filter.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { useThemeStore } from '../stores/themeStore';

interface FilterChipProps {
    title: string;
    isSelected: boolean;
    onPress: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ title, isSelected, onPress }) => {
    const { theme } = useThemeStore();

    return (
        <TouchableOpacity
            style={[
                styles.filterChip,
                {
                    backgroundColor: isSelected ? theme.colors.primary : 'transparent',
                    borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                }
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.filterChipText,
                { color: isSelected ? theme.colors.white : theme.colors.text }
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

interface RadioOptionProps {
    title: string;
    isSelected: boolean;
    onPress: () => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({ title, isSelected, onPress }) => {
    const { theme } = useThemeStore();

    return (
        <TouchableOpacity style={styles.radioOption} onPress={onPress}>
            <View style={[
                styles.radioCircle,
                { borderColor: isSelected ? theme.colors.primary : theme.colors.border }
            ]}>
                {isSelected && (
                    <View style={[styles.radioInner, { backgroundColor: theme.colors.primary }]} />
                )}
            </View>
            <Text style={[styles.radioText, { color: theme.colors.text }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

interface CheckboxOptionProps {
    title: string;
    isSelected: boolean;
    onPress: () => void;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({ title, isSelected, onPress }) => {
    const { theme } = useThemeStore();

    return (
        <TouchableOpacity style={styles.checkboxOption} onPress={onPress}>
            <View style={[
                styles.checkbox,
                {
                    borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    backgroundColor: isSelected ? theme.colors.primary : 'transparent'
                }
            ]}>
                {isSelected && (
                    <Ionicons name="checkmark" size={16} color={theme.colors.white} />
                )}
            </View>
            <Text style={[styles.checkboxText, { color: theme.colors.text }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default function FilterScreen() {
    const router = useRouter();
    const { theme } = useThemeStore();

    // Filter States
    const [selectedTab, setSelectedTab] = useState('Sort');
    const [sortBy, setSortBy] = useState('Trending');
    const [priceRange, setPriceRange] = useState([4, 32]);
    const [rating, setRating] = useState('4.5+');
    const [selectedGenres, setSelectedGenres] = useState(['Action', 'Adventure', 'Fantasy', 'Mystery', 'Thriller']);
    const [language, setLanguage] = useState('English');
    const [age, setAge] = useState('All');

    const filterTabs = ['Sort', 'Price', 'Rating', 'Genre', 'Language'];

    const sortOptions = ['Trending', 'New Releases', 'Highest Rating', 'Lowest Rating', 'Highest Price', 'Lowest Price'];
    const ratingOptions = ['All', '4.5+', '4.0+'];
    const genreOptions = ['All', 'Action', 'Adventure', 'Romance', 'Comics', 'Comedy', 'Fantasy', 'Mystery', 'Horror', 'Sci-Fi', 'Thriller', 'Travel'];
    const languageOptions = ['All', 'English', 'Mandarin', 'Other Languages'];
    const ageOptions = ['All', 'Ages 12 & Under'];

    const handleBack = () => {
        router.back();
    };

    const handleReset = () => {
        setSortBy('Trending');
        setPriceRange([4, 32]);
        setRating('All');
        setSelectedGenres([]);
        setLanguage('All');
        setAge('All');
    };

    const handleApply = () => {
        // Aplicar filtros e voltar
        console.log('Apply filters:', {
            sortBy,
            priceRange,
            rating,
            selectedGenres,
            language,
            age
        });
        router.back();
    };

    const toggleGenre = (genre: string) => {
        if (genre === 'All') {
            setSelectedGenres([]);
        } else {
            setSelectedGenres(prev =>
                prev.includes(genre)
                    ? prev.filter(g => g !== genre)
                    : [...prev, genre]
            );
        }
    };

    return (
        <Layout contentStyle={styles.layoutContent}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="close" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                        Filter
                    </Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Filter Tabs */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.tabsContainer}
                >
                    <View style={styles.tabs}>
                        {filterTabs.map((tab) => (
                            <FilterChip
                                key={tab}
                                title={tab}
                                isSelected={selectedTab === tab}
                                onPress={() => setSelectedTab(tab)}
                            />
                        ))}
                    </View>
                </ScrollView>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Sort Section */}
                    {selectedTab === 'Sort' && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Sort
                            </Text>
                            {sortOptions.map((option) => (
                                <RadioOption
                                    key={option}
                                    title={option}
                                    isSelected={sortBy === option}
                                    onPress={() => setSortBy(option)}
                                />
                            ))}
                        </View>
                    )}

                    {/* Price Section */}
                    {selectedTab === 'Price' && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Price
                            </Text>
                            <View style={styles.priceContainer}>
                                <View style={styles.priceLabels}>
                                    <Text style={[styles.priceLabel, { color: theme.colors.white, backgroundColor: theme.colors.primary }]}>
                                        ${priceRange[0]}
                                    </Text>
                                    <Text style={[styles.priceLabel, { color: theme.colors.white, backgroundColor: theme.colors.primary }]}>
                                        ${priceRange[1]}
                                    </Text>
                                </View>
                                <View style={[styles.slider, { backgroundColor: theme.colors.border }]}>
                                    <View style={[styles.sliderTrack, { backgroundColor: theme.colors.primary, width: '60%' }]} />
                                    <View style={[styles.sliderThumb, styles.sliderThumbLeft, { backgroundColor: theme.colors.primary }]} />
                                    <View style={[styles.sliderThumb, styles.sliderThumbRight, { backgroundColor: theme.colors.primary }]} />
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Rating Section */}
                    {selectedTab === 'Rating' && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Rating
                            </Text>
                            {ratingOptions.map((option) => (
                                <RadioOption
                                    key={option}
                                    title={option}
                                    isSelected={rating === option}
                                    onPress={() => setRating(option)}
                                />
                            ))}
                        </View>
                    )}

                    {/* Genre Section */}
                    {selectedTab === 'Genre' && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Genre
                            </Text>
                            {genreOptions.map((genre) => (
                                <CheckboxOption
                                    key={genre}
                                    title={genre}
                                    isSelected={genre === 'All' ? selectedGenres.length === 0 : selectedGenres.includes(genre)}
                                    onPress={() => toggleGenre(genre)}
                                />
                            ))}
                        </View>
                    )}

                    {/* Language Section */}
                    {selectedTab === 'Language' && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Language
                            </Text>
                            {languageOptions.map((option) => (
                                <RadioOption
                                    key={option}
                                    title={option}
                                    isSelected={language === option}
                                    onPress={() => setLanguage(option)}
                                />
                            ))}
                            <TouchableOpacity style={styles.expandOption}>
                                <Text style={[styles.expandText, { color: theme.colors.text }]}>
                                    Other Languages
                                </Text>
                                <Ionicons name="chevron-down" size={16} color={theme.colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Age Section */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                            Age
                        </Text>
                        {ageOptions.map((option) => (
                            <RadioOption
                                key={option}
                                title={option}
                                isSelected={age === option}
                                onPress={() => setAge(option)}
                            />
                        ))}
                    </View>
                </ScrollView>

                {/* Bottom Actions */}
                <View style={styles.bottomActions}>
                    <TouchableOpacity onPress={handleReset}>
                        <Text style={[styles.resetText, { color: theme.colors.primary }]}>
                            Reset
                        </Text>
                    </TouchableOpacity>
                    <Button
                        title="Apply"
                        onPress={handleApply}
                        style={styles.applyButton}
                    />
                </View>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    layoutContent: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    },
    backButton: {
        padding: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    placeholder: {
        width: 32,
    },
    tabsContainer: {
        marginBottom: 16,
    },
    tabs: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    filterChipText: {
        fontSize: 14,
        fontWeight: '500',
    },
    content: {
        flex: 1,
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    radioText: {
        fontSize: 16,
    },
    checkboxOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxText: {
        fontSize: 16,
    },
    priceContainer: {
        paddingVertical: 20,
    },
    priceLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    priceLabel: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        fontSize: 14,
        fontWeight: '600',
    },
    slider: {
        height: 4,
        borderRadius: 2,
        position: 'relative',
    },
    sliderTrack: {
        height: '100%',
        borderRadius: 2,
    },
    sliderThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        top: -8,
    },
    sliderThumbLeft: {
        left: '20%',
    },
    sliderThumbRight: {
        right: '20%',
    },
    expandOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    expandText: {
        fontSize: 16,
    },
    bottomActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    resetText: {
        fontSize: 16,
        fontWeight: '600',
    },
    applyButton: {
        paddingHorizontal: 32,
    },
});
// app/search.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Layout } from '../components/Layout';
import { useThemeStore } from '../stores/themeStore';

export default function SearchScreen() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([
        'Harry Potter and the Half Blood Prin...',
        'Harry Potter and the Order of Phoe...',
        'The First Mountain Man: Book 1',
        "I'm Glad My Mom Dead",
        'The Silent Patient',
        'Alpha Magic: Reverse Harem',
        'Taken by the Dragon King: Dragon',
        'The Legacy: Semester 1: Academy'
    ]);

    const handleBack = () => {
        router.back();
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            // Adicionar à lista de pesquisas recentes
            const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 8);
            setSearchHistory(newHistory);
            console.log('Search for:', searchQuery);
        }
    };

    const handleSearchHistoryPress = (query: string) => {
        setSearchQuery(query);
        console.log('Search from history:', query);
    };

    const handleRemoveFromHistory = (query: string) => {
        const newHistory = searchHistory.filter(item => item !== query);
        setSearchHistory(newHistory);
    };

    const clearAllHistory = () => {
        setSearchHistory([]);
    };

    return (
        <Layout contentStyle={styles.layoutContent}>
            <View style={styles.container}>
                {/* Header with Search Bar */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                    </TouchableOpacity>

                    <View style={[styles.searchBar, {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.primary
                    }]}>
                        <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
                        <TextInput
                            style={[styles.searchInput, { color: theme.colors.text }]}
                            placeholder="Search books, authors..."
                            placeholderTextColor={theme.colors.textSecondary}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearchSubmit}
                            autoFocus
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={handleClearSearch}>
                                <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Previous Search Section */}
                    {searchHistory.length > 0 && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                    Previous Search
                                </Text>
                                <TouchableOpacity onPress={clearAllHistory}>
                                    <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            {searchHistory.map((query, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.historyItem}
                                    onPress={() => handleSearchHistoryPress(query)}
                                >
                                    <Text style={[styles.historyText, { color: theme.colors.textSecondary }]}>
                                        {query}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => handleRemoveFromHistory(query)}
                                        style={styles.removeButton}
                                    >
                                        <Ionicons name="close" size={16} color={theme.colors.textSecondary} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Search Results */}
                    {searchQuery.length > 0 && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Search Results for "{searchQuery}"
                            </Text>
                            {/* Aqui você pode adicionar os resultados da pesquisa */}
                            <Text style={[styles.noResults, { color: theme.colors.textSecondary }]}>
                                No results found. Try a different search term.
                            </Text>
                        </View>
                    )}
                </ScrollView>
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
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
        gap: 12,
    },
    backButton: {
        padding: 4,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 2,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    content: {
        flex: 1,
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    historyText: {
        fontSize: 16,
        flex: 1,
    },
    removeButton: {
        padding: 8,
    },
    noResults: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
    },
});
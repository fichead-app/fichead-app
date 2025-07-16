// app/(tabs)/discover.tsx
import { BookSection } from '@/components/BookSection';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';

interface BookCardProps {
    title: string;
    author: string;
    rating: number;
    price?: string;
    coverColor: string;
    onPress: () => void;
}

export default function DiscoverScreen() {
    const { theme } = useThemeStore();

    const topChartsBooks = [
        {
            id: 1,
            title: 'Harry Potter and the Deathly Hallows',
            author: 'J.K. ROWLING',
            rating: 4.7,
            price: '$9.99',
            coverColor: '#1a237e'
        },
        {
            id: 2,
            title: 'A Court of Thorns & Roses Book 1',
            author: 'SARAH J. MAAS',
            rating: 4.6,
            price: '$6.50',
            coverColor: '#c62828'
        },
        {
            id: 3,
            title: 'Circe',
            author: 'MADELINE MILLER',
            rating: 4.8,
            price: '$8.99',
            coverColor: '#ff8f00'
        }
    ];

    const topSellingBooks = [
        {
            id: 4,
            title: 'The Batman Who Laughs: Issues 1-7',
            author: 'SCOTT SNYDER, JOCK',
            rating: 4.3,
            price: '$10.44',
            coverColor: '#d32f2f'
        },
        {
            id: 5,
            title: 'Game of Thrones: A Song of Ice & Fire ...',
            author: 'GEORGE R.R. MARTIN',
            rating: 4.4,
            price: '$7.79',
            coverColor: '#424242'
        },
        {
            id: 6,
            title: 'Lord of the Rings',
            author: 'J.R.R. TOLKIEN',
            rating: 4.9,
            price: '$12.99',
            coverColor: '#2e7d32'
        }
    ];

    const topFreeBooks = [
        {
            id: 7,
            title: 'Alpha Magic: Reverse Harem Paranormal ...',
            author: 'AMELIA SHAW',
            rating: 4.4,
            price: 'Free',
            coverColor: '#1a237e'
        },
        {
            id: 8,
            title: 'Taken by the Dragon King: Dragon Shifte...',
            author: 'AMELIA SHAW',
            rating: 4.6,
            price: 'Free',
            coverColor: '#8e24aa'
        },
        {
            id: 9,
            title: 'Love Beyond Time',
            author: 'REBECCA ROYCE',
            rating: 4.2,
            price: 'Free',
            coverColor: '#00695c'
        }
    ];

    const topNewReleases = [
        {
            id: 10,
            title: 'Song of Silver, Flame Like Night',
            author: 'AMÉLIE WEN ZHAO',
            rating: 4.0,
            price: '$9.99',
            coverColor: '#1565c0'
        },
        {
            id: 11,
            title: 'Son of the Poison Rose: A Kagen a Da...',
            author: 'JONATHAN MABERRY',
            rating: 4.3,
            price: '$8.50',
            coverColor: '#7b1fa2'
        },
        {
            id: 12,
            title: 'Love in the Time of AI',
            author: 'SARAH CHEN',
            rating: 4.1,
            price: '$7.99',
            coverColor: '#e91e63'
        }
    ];

    return (
        <Layout contentStyle={styles.layoutContent}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Text style={[styles.logo, { color: theme.colors.primary }]}>📚</Text>
                        <Text style={[styles.appName, { color: theme.colors.text }]}>Discover</Text>
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="search" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Top Charts */}
                    <BookSection
                        title="Top Charts"
                        books={topChartsBooks}
                        onSeeAll={() => console.log('See all Top Charts')}
                    />

                    {/* Top Selling */}
                    <BookSection
                        title="Top Selling"
                        books={topSellingBooks}
                        onSeeAll={() => console.log('See all Top Selling')}
                    />

                    {/* Top Free */}
                    <BookSection
                        title="Top Free"
                        books={topFreeBooks}
                        onSeeAll={() => console.log('See all Top Free')}
                    />

                    {/* Top New Releases */}
                    <BookSection
                        title="Top New Releases"
                        books={topNewReleases}
                        onSeeAll={() => console.log('See all Top New Releases')}
                    />
                </ScrollView>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    layoutContent: {
        paddingHorizontal: 0,
        paddingVertical: 0, // Remove padding vertical
    },
    container: {
        flex: 1,
        paddingBottom: 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingTop: 16, // Adiciona padding top para compensar
        paddingHorizontal: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        fontSize: 24,
        marginRight: 8,
    },
    appName: {
        fontSize: 20,
        fontWeight: '700',
    },
    scrollContainer: {
        flex: 1,
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16, // Adiciona padding só no header da seção
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    booksContainer: {
        flexDirection: 'row',
        gap: 16,
        paddingLeft: 16, // Padding só à esquerda para o primeiro item
        paddingRight: 16, // Padding só à direita para o último item
    },
    bookCard: {
        width: 120,
    },
    bookCover: {
        width: 120,
        height: 180,
        borderRadius: 8,
        marginBottom: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    bookSpine: {
        position: 'absolute',
        left: 8,
        top: 8,
        bottom: 8,
        width: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
    },
    bookTitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
        lineHeight: 16,
        minHeight: 32,
    },
    bookAuthor: {
        fontSize: 11,
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    bookInfo: {
        gap: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 2,
    },
    rating: {
        fontSize: 11,
    },
    price: {
        fontSize: 12,
        fontWeight: '600',
    },
    freePrice: {
        fontSize: 12,
        fontWeight: '600',
    },
});
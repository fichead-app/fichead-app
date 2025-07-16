// app/(tabs)/index.tsx
import { BookCard } from '@/components/BookCard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

interface BookCardProps {
    title: string;
    author?: string;
    rating: number;
    price?: string;
    status?: string;
    coverColor: string;
    onPress: () => void;
}

const GenreCard: React.FC<{ title: string; bgColor: string; image: string }> = ({ title, bgColor, image }) => {
    const { theme } = useThemeStore();

    return (
        <TouchableOpacity style={[styles.genreCard, { backgroundColor: bgColor }]}>
            <Text style={[styles.genreTitle, { color: theme.colors.white }]}>
                {title}
            </Text>
            <Text style={[styles.genreImage, { position: 'absolute', bottom: 8, right: 8 }]}>
                {image}
            </Text>
        </TouchableOpacity>
    );
};

export default function HomeScreen() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { user } = useUserStore();

    const handleNotificationsPress = () => {
        router.push('/notifications');
    };

    const handleSearchPress = () => {
        router.push('/search');
    };

    const featuredBooks = [
        {
            id: 1,
            title: 'The House of Hades (Heroes of Olympus ...',
            rating: 4.6,
            price: '$6.50',
            coverColor: '#8B0000'
        },
        {
            id: 2,
            title: 'My Quiet Blacksmith Life in Another Worl...',
            rating: 4.7,
            price: '$6.99',
            coverColor: '#FF6B6B'
        },
        {
            id: 3,
            title: 'Love Me Sweet',
            rating: 4.8,
            price: '$5.99',
            coverColor: '#4ECDC4'
        },
    ];

    const recommendedBooks = [
        {
            id: 4,
            title: 'Trapped in a Dating Sim: The World of O...',
            rating: 4.9,
            price: '$8.99',
            coverColor: '#45B7D1'
        },
        {
            id: 5,
            title: 'It Starts with Us: A Novel',
            rating: 4.5,
            price: '$11.50',
            coverColor: '#96CEB4'
        },
        {
            id: 6,
            title: 'Looking for Love',
            rating: 4.3,
            price: '$7.25',
            coverColor: '#FFEAA7'
        },
    ];

    const purchasedBooks = [
        {
            id: 7,
            title: 'Batman: Arkham Unhinged Vol. 1',
            rating: 4.3,
            status: 'Purchased',
            coverColor: '#2D3436'
        },
        {
            id: 8,
            title: 'His Dark Materials: The Golden Compa...',
            rating: 4.6,
            status: 'Purchased',
            coverColor: '#6C5CE7'
        },
        {
            id: 9,
            title: 'Love Story Collection',
            rating: 4.4,
            status: 'Purchased',
            coverColor: '#FD79A8'
        },
    ];

    const wishlistBooks = [
        {
            id: 10,
            title: 'Stephen King Fairy Tale',
            rating: 4.8,
            coverColor: '#2D3436'
        },
        {
            id: 11,
            title: 'Brandon Sanderson The Lost Metal',
            rating: 4.7,
            coverColor: '#E17055'
        },
    ];

    const genres = [
        { title: 'Romance', bgColor: '#FF6B6B', image: '💕' },
        { title: 'Thriller', bgColor: '#2D3436', image: '🔪' },
        { title: 'Inspiration', bgColor: '#74B9FF', image: '✨' },
    ];

    return (
        <Layout contentStyle={styles.layoutContent}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Text style={[styles.logo, { color: theme.colors.primary }]}>📚</Text>
                        <Text style={[styles.appName, { color: theme.colors.text }]}>Erabook</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerButton} onPress={handleSearchPress}>
                            <Ionicons name="search" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerButton} onPress={handleNotificationsPress}>
                            <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Featured Books Carousel */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.featuredSection}
                        contentContainerStyle={styles.featuredContainer}
                    >
                        {featuredBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                title={book.title}
                                rating={book.rating}
                                price={book.price}
                                coverColor={book.coverColor}
                                onPress={() => console.log('Book pressed:', book.title)}
                            />
                        ))}
                    </ScrollView>

                    {/* Explore by Genre */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Explore by Genre
                            </Text>
                            <TouchableOpacity>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.genresContainer}>
                                {genres.map((genre, index) => (
                                    <GenreCard
                                        key={index}
                                        title={genre.title}
                                        bgColor={genre.bgColor}
                                        image={genre.image}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    {/* Recommended for You */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Recommended For You
                            </Text>
                            <TouchableOpacity>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.booksContainer}>
                                {recommendedBooks.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        title={book.title}
                                        rating={book.rating}
                                        price={book.price}
                                        coverColor={book.coverColor}
                                        onPress={() => console.log('Book pressed:', book.title)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    {/* On Your Purchased */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                On Your Purchased
                            </Text>
                            <TouchableOpacity>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.booksContainer}>
                                {purchasedBooks.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        title={book.title}
                                        rating={book.rating}
                                        status={book.status}
                                        coverColor={book.coverColor}
                                        onPress={() => console.log('Book pressed:', book.title)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    {/* On Your Wishlist */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                On Your Wishlist
                            </Text>
                            <TouchableOpacity>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.booksContainer}>
                                {wishlistBooks.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        title={book.title}
                                        rating={book.rating}
                                        coverColor={book.coverColor}
                                        onPress={() => console.log('Book pressed:', book.title)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
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
        paddingBottom: 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingTop: 16,
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
    headerActions: {
        flexDirection: 'row',
        gap: 16,
    },
    headerButton: {
        padding: 4,
    },
    scrollContainer: {
        flex: 1,
    },
    featuredSection: {
        marginBottom: 32,
    },
    featuredContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        gap: 16,
    },
    section: {
        marginBottom: 20, // Reduzido para ficar igual ao Discover
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 0, // Remove padding lateral
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        paddingLeft: 16, // Adiciona padding só no texto
    },
    genreSection: {
        marginBottom: 20, // Consistente com outras seções
    },
    seeAllButton: {
        paddingRight: 16, // Adiciona padding só no botão
    },
    genresContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingLeft: 16,
        paddingRight: 16,
    },
    genreCard: {
        width: 120,
        height: 80,
        borderRadius: 12,
        padding: 12,
        position: 'relative',
    },
    genreTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    genreImage: {
        fontSize: 20,
    },
    booksContainer: {
        flexDirection: 'row',
        gap: 16,
        paddingLeft: 16,
        paddingRight: 16,
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
    },
    bookInfo: {
        gap: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    rating: {
        fontSize: 11,
    },
    price: {
        fontSize: 12,
        fontWeight: '600',
    },
    status: {
        fontSize: 11,
        fontWeight: '500',
    },
});
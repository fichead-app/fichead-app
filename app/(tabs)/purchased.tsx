// app/(tabs)/purchased.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';

interface PurchasedItemProps {
    title: string;
    author: string;
    rating: number;
    status: string;
    coverColor: string;
    downloadStatus: 'downloaded' | 'not_downloaded';
    onPress: () => void;
    onOptionsPress: () => void;
}

const PurchasedItem: React.FC<PurchasedItemProps> = ({
    title,
    author,
    rating,
    status,
    coverColor,
    downloadStatus,
    onPress,
    onOptionsPress
}) => {
    const { theme } = useThemeStore();

    return (
        <TouchableOpacity style={styles.purchasedItem} onPress={onPress}>
            <View style={[styles.bookCover, { backgroundColor: coverColor }]}>
                <View style={styles.bookSpine} />
            </View>

            <View style={styles.bookInfo}>
                <Text style={[styles.bookTitle, { color: theme.colors.text }]} numberOfLines={3}>
                    {title}
                </Text>
                <Text style={[styles.bookAuthor, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                    {author}
                </Text>

                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
                        {rating}
                    </Text>
                </View>

                <Text style={[styles.status, { color: theme.colors.textSecondary }]}>
                    {status}
                </Text>
            </View>

            <View style={styles.rightActions}>
                <TouchableOpacity
                    style={[styles.downloadButton, { backgroundColor: theme.colors.primary }]}
                >
                    <Ionicons
                        name={downloadStatus === 'downloaded' ? 'checkmark' : 'download-outline'}
                        size={16}
                        color={theme.colors.white}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionsButton}
                    onPress={onOptionsPress}
                >
                    <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default function PurchasedScreen() {
    const { theme } = useThemeStore();

    const purchasedBooks = [
        {
            id: 1,
            title: 'Harry Potter and the Deathly Hallows',
            author: 'J.K. ROWLING',
            rating: 4.9,
            status: 'Purchased',
            coverColor: '#1a237e',
            downloadStatus: 'downloaded' as const
        },
        {
            id: 2,
            title: 'Harry Potter and the Half-Blood Prince',
            author: 'J.K. ROWLING',
            rating: 4.8,
            status: 'Purchased',
            coverColor: '#0D4F3C',
            downloadStatus: 'downloaded' as const
        },
        {
            id: 3,
            title: 'Harry Potter and the Order of the Phoenix',
            author: 'J.K. ROWLING',
            rating: 4.9,
            status: 'Purchased',
            coverColor: '#2D1B69',
            downloadStatus: 'not_downloaded' as const
        },
        {
            id: 4,
            title: 'Harry Potter and the Goblet of Fire',
            author: 'J.K. ROWLING',
            rating: 4.7,
            status: 'Purchased',
            coverColor: '#1B4332',
            downloadStatus: 'downloaded' as const
        },
        {
            id: 5,
            title: 'Harry Potter and the Prisoner of Azkaban',
            author: 'J.K. ROWLING',
            rating: 4.8,
            status: 'Purchased',
            coverColor: '#6A4C93',
            downloadStatus: 'downloaded' as const
        },
    ];

    const handleBookPress = (bookId: number) => {
        console.log('Book pressed:', bookId);
    };

    const handleOptionsPress = (bookId: number) => {
        console.log('Options pressed:', bookId);
    };

    return (
        <Layout contentStyle={styles.layoutContent}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Text style={[styles.logo, { color: theme.colors.primary }]}>📦</Text>
                        <Text style={[styles.appName, { color: theme.colors.text }]}>Purchased</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity>
                            <Ionicons name="search" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="options" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Purchased Items */}
                {purchasedBooks.map((book) => (
                    <PurchasedItem
                        key={book.id}
                        title={book.title}
                        author={book.author}
                        rating={book.rating}
                        status={book.status}
                        coverColor={book.coverColor}
                        downloadStatus={book.downloadStatus}
                        onPress={() => handleBookPress(book.id)}
                        onOptionsPress={() => handleOptionsPress(book.id)}
                    />
                ))}
            </ScrollView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingTop: 8,
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
    purchasedItem: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'flex-start',
    },
    bookCover: {
        width: 80,
        height: 120,
        borderRadius: 8,
        marginRight: 16,
        position: 'relative',
    },
    bookSpine: {
        position: 'absolute',
        left: 6,
        top: 6,
        bottom: 6,
        width: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 1,
    },
    bookInfo: {
        flex: 1,
        paddingRight: 8,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 4,
    },
    bookAuthor: {
        fontSize: 14,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    rating: {
        fontSize: 14,
    },
    status: {
        fontSize: 14,
        fontWeight: '500',
    },
    rightActions: {
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    downloadButton: {
        width: 28,
        height: 28,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsButton: {
        padding: 8,
    },
});
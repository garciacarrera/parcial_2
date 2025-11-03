import type { Book, BookInCart } from "@/models/Book";
import { defineStore } from "pinia";

interface BookInCartState {
    isLoading: boolean,
    data: BookInCart[],
    error: string | null,
    totalPrice: number,
    totalBooks: number,
}

export const useBookInCartStore = defineStore('bookInCart',
    {
        state: (): BookInCartState => ({
            isLoading: false,
            data: [],
            error: null,
            totalPrice: 0,
            totalBooks: 0
        }),
        actions: {
            setInitialData(books: BookInCart[]) {
                this.data = books
            },
            addBookInCart(book: Book) {
                const bookExistInCart = this.data.find(b => b.id === book.id )
                if(bookExistInCart){
                    bookExistInCart.qty++
                    this.totalBooks++
                }else{
                    this.data.push({...book, qty: 1})
                    this.totalBooks++
                }

                this.totalPrice += book.price
            },
            removeBookInCart(book: Book): void {
                const bookExistInCart = this.data.find(b => b.id === book.id)

                if(!bookExistInCart) return;

                if(bookExistInCart.qty>=1){
                    bookExistInCart.qty--
                    if(bookExistInCart.qty===0){
                        this.data = this.data.filter(b => b.id !== book.id)
                    }
                    this.totalBooks--
                }

                this.totalPrice -= book.price
            }
        },
        getters: {
            getBooks(): BookInCart[] {
                return this.data
            },
            getTotalPrice(): number {
                return this.totalPrice
            },
            getTotalBooks(): number {
                return this.totalBooks
            }
        }
    }
)
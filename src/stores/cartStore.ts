import type { Book, BookInCart } from "@/models/Book";
import { defineStore } from "pinia";

interface BookInCartState {
    isLoading: boolean,
    data: BookInCart[],
    error: string | null,
    precioTotal: number,
    TotalLibros: number,
}

export const useBookInCartStore = defineStore('bookInCart',
    {
        state: (): BookInCartState => ({
            isLoading: false,
            data: [],
            error: null,
            precioTotal: 0,
            TotalLibros: 0
        }),
        actions: {
            setInitialData(books: BookInCart[]) {
                this.data = books
            },
            addBookInCart(book: Book) {
                const CarritoLibro = this.data.find(b => b.id === book.id )
                if(CarritoLibro){
                    CarritoLibro.qty++
                    this.TotalLibros++
                    
                }else{
                    this.data.push({...book, qty: 1})
                    this.TotalLibros++
                }

                this.precioTotal += book.price
            },
            removeBookInCart(book: Book): void {
                const CarritoLibro = this.data.find(b => b.id === book.id)

                if(!CarritoLibro) return;

                if(CarritoLibro.qty>=1){
                    CarritoLibro.qty--
                    if(CarritoLibro.qty===0){
                        this.data = this.data.filter(b => b.id !== book.id)
                    }
                    this.TotalLibros--
                }

                this.precioTotal -= book.price
            }
        },
        getters: {
            getBooks(): BookInCart[] {
                return this.data
            },
            getprecioTotal(): number {
                return this.precioTotal
            },
            getTotalBooks(): number {
                return this.TotalLibros
                
            }
        }
    }
)
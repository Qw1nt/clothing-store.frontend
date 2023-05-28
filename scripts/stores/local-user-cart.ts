const key = "countProductsInCart"

export const productsInCartCount = ref(0)

export class LocalUserCart {
    add(amount: number) {
        const currentCount = this.getCount();
        const value = currentCount + amount;
        this.set(value);
    }

    remove(amount: number) {
        const currentCount = this.getCount();
        const value = currentCount + amount;
        this.set(value);
    }

    set(count: number) {
        localStorage.setItem(key, `${count}`);
        productsInCartCount.value = count;
    }

    getCount(): number {
        const item = localStorage.getItem(key);

        if (item != null) {
            const value = Number(item);
            return Number(item)
        }

        return 0;
    }
}
import { writable } from "svelte/store";

const items = [
    { name: 'Home', path: '/', icon: '🏠' },
    
];

export let navigationItems = writable(items);
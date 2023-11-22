import { Factura } from "../types/Factura";

const BASE_URL = 'http://localhost:8080/api/v1';

export const FacturaService = {

    getFacturas: async (): Promise<Factura[]> => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/facturas/getAll`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();

        return data;
    },


    getFactura: async (id: number): Promise<Factura> => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/facturas/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    },

    createFactura: async (factura: Factura): Promise<Factura> => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/facturas`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(factura)
        });
        const data = await response.json();
        return data;
    },

    updateFactura: async (id: number, factura: Factura): Promise<Factura> => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/facturas/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(factura)
        });
        const data = await response.json();
        return data;
    },

    deleteFactura: async (id: number): Promise<void> => {
        const token = localStorage.getItem('token');
        await fetch(`${BASE_URL}/facturas/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

    }
}
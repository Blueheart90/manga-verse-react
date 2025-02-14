<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class FetchService
{
    /**
     * Realiza una solicitud HTTP.
     *
     * @param string $url URL completa de la API a consultar.
     * @param string $method Método HTTP (GET, POST, PUT, DELETE).
     * @param array $queryParams Parámetros de consulta (query string).
     * @param array $data Datos a enviar en el cuerpo de la solicitud (para POST o PUT).
     * @param array $headers Encabezados adicionales para la solicitud.
     * @return array La respuesta decodificada en formato de arreglo.
     *
     * @throws \Exception Si ocurre un error durante la solicitud.
     */
    public function request(
        string $url,
        string $method = 'GET',
        array $queryParams = [],
        array $data = [],
        array $headers = []
    ): array {
        try {
            // Prepara la solicitud HTTP con query params y headers
            $response = Http::withHeaders($headers)->{$method}(
                $url,
                $method === 'GET' ? $queryParams : $data
            );

            // Lanza una excepción si la solicitud falla
            $response->throw();

            // Retorna la respuesta como arreglo
            return $response->json();
        } catch (\Exception $e) {
            // Manejo de excepciones o re-lanzamiento
            throw new \Exception(
                "Error al realizar la solicitud: {$e->getMessage()}"
            );
        }
    }
}

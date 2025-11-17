/**
 * Endpoint Health Check - Architecture Command Pattern
 * 1 endpoint = 1 fichier avec toute la logique métier
 * 
 * Ce fichier contient:
 * - La commande (logique métier)
 * - Le handler HTTP
 * - Les types nécessaires
 */

import { NextRequest, NextResponse } from 'next/server';

// ============================================================================
// TYPES
// ============================================================================

interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
}

// ============================================================================
// COMMAND - Logique métier
// ============================================================================

/**
 * Commande: Vérifier l'état de santé de l'application
 * Pattern: Command Pattern - toute la logique métier dans une fonction
 */
class HealthCheckCommand {
  execute(): HealthCheckResult {
    const startTime = process.uptime();
    
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: startTime,
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    };
  }
}

// ============================================================================
// HTTP HANDLERS
// ============================================================================

/**
 * GET /api/health
 * Retourne l'état de santé de l'application
 */
export async function GET(request: NextRequest) {
  try {
    // Exécuter la commande
    const command = new HealthCheckCommand();
    const result = command.execute();

    // Retourner la réponse
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // Gestion d'erreur
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// EXEMPLE D'UTILISATION AVEC POST (optionnel)
// ============================================================================

/**
 * POST /api/health
 * Exemple de commande avec payload
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation simple
    if (body.ping !== 'ping') {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }

    // Réponse
    return NextResponse.json(
      {
        pong: 'pong',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
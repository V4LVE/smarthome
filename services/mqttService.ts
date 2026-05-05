import mqtt, { MqttClient } from 'mqtt';

const host = '10.131.20.59';
const brokerUrl = `wss://${host}:8083/mqtt`;
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);

const options = {
    keepalive: 30,
    clientId,
    protocol: 'wss' as const,
    protocolId: 'MQTT' as const,
    protocolVersion: 4 as const,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    username: 'pi',
    password: 'Pwrvol901',
    will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0 as const,
        retain: false
    },
    rejectUnauthorized: false
}

let client: MqttClient | null = null;
let isConnected = false;

export function getClient(): MqttClient | null {
    return client;
}

export function ensureConnection(): boolean {
    if (!isConnected) {
        connectMqtt();
    }
    return isConnected;
}

export function connectMqtt(): MqttClient {
    // Prevent multiple clients/listeners
    if (client) {
        return client;
    }

    console.log('connecting mqtt client');
    client = mqtt.connect(brokerUrl, options);

    client.on('error', (err) => {
        console.log(err);
        client?.end();
        client = null;
        isConnected = false;
    });

    client.on('connect', () => {
        console.log('client connected: ' + clientId);
        client?.subscribe('telemetry', { qos: 0 });
        isConnected = true;
    });

    // client.on('message', async (topic, message, packet) => {
    //     try {
    //         // Only store intended topic
    //         if (topic !== 'telemetry') return;

    //         // Optional: skip duplicated re-delivery
    //         if (packet.dup) return;

    //         const telemetry: TelemetryModel = JSON.parse(message.toString());

    //         console.log(`[${topic}] Temperature: ${telemetry.temperature}°C`);
    //         console.log(`[${topic}] Humidity: ${telemetry.humidity}%`);

    //         await db.insert(telemetryTable).values(telemetry).execute();
    //     } catch (err) {
    //         console.error('Failed to parse message:', err);
    //     }
    // });

    client.on('close', () => {
        console.log(clientId + ' disconnected');
        client = null;
        isConnected = false;
    });

    return client;
}
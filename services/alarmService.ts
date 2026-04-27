import { getClient } from "./mqttService";
import { ensureConnection } from "./mqttService";

const alarmTopic = 'alarm';

export async function toggleAlarm(shouldArm: boolean): Promise<void> {
    ensureConnection();
    const mqttClient = getClient();
    console.log(`Toggling alarm to ${shouldArm ? 'armed' : 'disarmed'} state...`);
    console.log(`MQTT client connected: ${mqttClient?.connected}`);
    if (mqttClient) {
        await mqttClient.publishAsync(alarmTopic, shouldArm ? 'ARM' : 'DISARM');
        console.log(`Alarm ${shouldArm ? 'armed' : 'disarmed'} via MQTT`);
    }
}
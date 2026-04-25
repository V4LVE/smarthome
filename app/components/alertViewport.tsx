"use client";

import { Alert } from "@heroui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { alertManager, type AlertItem } from "@/lib/alert-manager";

export function AlertViewport() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const unsubscribe = alertManager.subscribe((nextAlert) => {
      setAlerts((current) => [...current, nextAlert]);

      const timeoutId = setTimeout(() => {
        setAlerts((current) => current.filter((item) => item.id !== nextAlert.id));
        timeoutsRef.current.delete(nextAlert.id);
      }, nextAlert.duration);

      timeoutsRef.current.set(nextAlert.id, timeoutId);
    });

    return () => {
      unsubscribe();
      for (const timeoutId of timeoutsRef.current.values()) {
        clearTimeout(timeoutId);
      }
      timeoutsRef.current.clear();
    };
  }, []);

  const hasAlerts = useMemo(() => alerts.length > 0, [alerts]);

  if (!hasAlerts) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-3 px-4 sm:bottom-6 sm:right-6 sm:px-0">
      {alerts.map((alert) => (
        <Alert key={alert.id} status={alert.status} className="pointer-events-auto">
          <Alert.Content>
            <Alert.Title>{alert.title}</Alert.Title>
            <Alert.Description>{alert.message}</Alert.Description>
          </Alert.Content>
        </Alert>
      ))}
    </div>
  );
}

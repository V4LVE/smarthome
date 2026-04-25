export type AlertStatus = "danger" | "warning" | "success" | "accent";

export type AlertItem = {
  id: string;
  title: string;
  message: string;
  status: AlertStatus;
  duration: number;
};

type AlertInput = {
  title: string;
  message: string;
  status: AlertStatus;
  duration?: number;
};

type AlertListener = (alert: AlertItem) => void;

const listeners = new Set<AlertListener>();

const DEFAULT_DURATION = 5000;

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function emit(input: AlertInput) {
  const alert: AlertItem = {
    id: createId(),
    title: input.title,
    message: input.message,
    status: input.status,
    duration: input.duration ?? DEFAULT_DURATION,
  };

  for (const listener of listeners) {
    listener(alert);
  }
}

export const alertManager = {
  subscribe(listener: AlertListener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },

  showError(title: string, message: string, duration?: number) {
    emit({ title, message, status: "danger", duration });
  },

  showWarning(title: string, message: string, duration?: number) {
    emit({ title, message, status: "warning", duration });
  },

  showSuccess(title: string, message: string, duration?: number) {
    emit({ title, message, status: "success", duration });
  },

  showInfo(title: string, message: string, duration?: number) {
    emit({ title, message, status: "accent", duration });
  },
};

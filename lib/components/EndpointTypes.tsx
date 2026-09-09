export type KDC101Controller = {
    connected: boolean;
    decrease_label: string;
    increase_label: string;
    motor: {
        jog: {
            accel: number;
            max_vel: number;
            min_vel: number;
            mode: number;
            step: number | null;
            step_size: number;
            stop_mode: number;
        };
        limits: {
            lower_limit: number;
            upper_limit: number;
        };
        position: {
            current_pos: number;
            home: number | null;
            set_target_pos: number;
            stop: number | null;
        };
    };
    type: string;
}

export interface KinesisEndpoint {
    bg_task_interval: number;
    controllers: {
        [controllerName: string]: KDC101Controller;
    }
}

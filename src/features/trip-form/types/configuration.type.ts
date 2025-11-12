export interface configuration {
    steps: number[];
    label: string;
    action: () => void;
    status: boolean;   
}
export interface DiaryData{
    id: number;
    createdDate: Date;
    emotionId: number,
    content: string;
}

export type ButtonProps = {
    children: React.ReactNode;
    styles: string;
    onClick?: any;
    disabled?: boolean;
    type: 'submit'|'button'|'reset';
    text: string;
}
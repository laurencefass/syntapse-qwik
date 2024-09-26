/** @jsxImportSource react */
import { useEffect, useState, type ReactNode } from 'react';
import { qwikify$ } from '@builder.io/qwik-react';

function Frame({ children }: { children?: ReactNode[] }) {
    const [message, setMessage] = useState("rendered on server");
    useEffect(() => {
        setMessage("rendered on client");
    }, [])
    return (
        <div
            style={{
                display: 'inline-block',
                border: '1px solid black',
                borderRadius: '10px',
                padding: '5px',
            }}
        >
            <div>Wrapper component renders with no eagerness setting so acts as an RSC</div>
            <div>{message}</div>
            {children}
        </div>
    );
}

export const QFrame = qwikify$(Frame);
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface Props {
  email: string;
  onVerify: (code: string) => Promise<void>;
  onBack: () => void;
}

export function TwoFactorAuth({ email, onVerify, onBack }: Props) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length < 4) return;
    setLoading(true);
    try {
      await onVerify(code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center px-4 py-2 relative overflow-hidden travel-gradient">
      <Card className="w-full max-w-sm auth-card-blur auth-glow animate-fade-in relative z-10">
        <CardHeader className="text-center pb-3">
          <div className="mx-auto mb-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl text-gray-800 mb-1">Verificación 2FA</CardTitle>
          <p className="text-xs text-gray-500">
            Introduce el código enviado al correo <b>{email}</b>
          </p>
        </CardHeader>

        <CardContent className="space-y-3 pb-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              id="code"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-center tracking-widest text-lg"
              required
              maxLength={6}
            />
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onBack}>
                Volver
              </Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Verificando..." : "Verificar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

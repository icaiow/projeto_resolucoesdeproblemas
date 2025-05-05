
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Shield } from "lucide-react";

type FormData = {
  subject: string;
  message: string;
  anonymous: boolean;
};

const EnviarEscuta = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    defaultValues: {
      subject: "",
      message: "",
      anonymous: true,
    }
  });

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    // In a real app, this would send data to a backend
    setTimeout(() => {
      toast({
        title: "Escuta digital enviada",
        description: "Sua mensagem foi enviada com sucesso e será analisada pela equipe."
      });
      setIsSubmitting(false);
      navigate("/home-alunos");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Canal de Escuta Digital</h1>
        <p className="text-gray-600 mb-8">
          Compartilhe suas experiências, dúvidas ou sugestões. Sua mensagem será analisada pela equipe institucional.
        </p>
      </div>

      <Card className="p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 text-green-bright">
          <Shield className="h-6 w-6" />
          <p className="font-medium">Este é um espaço seguro para compartilhar suas preocupações</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assunto</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Descreva brevemente o assunto" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua mensagem</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva sua situação, dúvida ou sugestão..." 
                      className="min-h-[200px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Seja específico para que possamos entender melhor sua situação.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="anonymous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Enviar anonimamente</FormLabel>
                    <FormDescription>
                      Sua identidade será protegida e não será revelada para a instituição.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/home-alunos")}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-green-bright hover:bg-green-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar escuta"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EnviarEscuta;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  getChainByChainId,
  getChainByChainName,
  supportedChains,
} from "@/lib/supportedChains";
import { transferUSDC } from "@/lib/transferTokens";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getEmbeddedConnectedWallet,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  chain: z.string().min(1, {
    message: "Chain must be selected.",
  }),
  address: z.string().min(1, {
    message: "Address must be entered.",
  }),
  amount: z.coerce.number().gt(0, {
    message: "Amount must be greater than 0",
  }),
});

export function TransferForm() {
  const {} = usePrivy();
  const { ready, wallets } = useWallets();
  const { toast } = useToast();

  const embeddedWallet = getEmbeddedConnectedWallet(wallets);
  const provider =
    embeddedWallet != null ? embeddedWallet.getEthereumProvider() : null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chain: getChainByChainId(embeddedWallet?.chainId).name || "",
      address: "",
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    embeddedWallet?.switchChain(getChainByChainName(values.chain).id);

    const txnHash = await transferUSDC(
      provider,
      values.chain,
      values.address,
      values.amount
    );

    toast({
      title: "Transaction Sent",
      description: "Transacton Hash: " + txnHash,
      action: (
        <ToastAction altText="Copy">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(txnHash);
            }}
          >
            Copy
          </button>
        </ToastAction>
      ),
    });
  }

  if (!ready) {
    return <></>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-[350px]">
          <CardHeader className="mt-4">
            <CardTitle>Airdrop USDC</CardTitle>
            <CardDescription>Airdrop USDC with a single click.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="chain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chain</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a supported chain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {supportedChains.map((chain) => (
                          <SelectItem key={chain.id} value={chain.name}>
                            {chain.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recepient&apos;s Address</FormLabel>
                    <FormControl>
                      <Input placeholder="0xab...cd" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Confirm</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

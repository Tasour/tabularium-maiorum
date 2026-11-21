/*
 * Vue « Ascendance de Vincent » : numérotation Sosa-Stradonitz et statut de preuve
 * de chaque lien. Outil de lecture : aucun lien n'est promu ici, aucune preuve
 * n'est inventée. Les liens hypothétiques restent explicites.
 */
import { useMemo, useState } from "react";
import { Badge, Group, Paper, ScrollArea, SegmentedControl, Stack, Table, Text, Title } from "@mantine/core";
import { IconAlertTriangle, IconBinaryTree2 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { donneesArbre } from "../data/individus";
import { ascendanceSosa, type NoeudSosa } from "../lib/sosa";
import { afficherDate } from "../lib/dates";

const RACINE_DEFAUT = "tas-vincent";
const OBJ = { etabli: "Établi par acte", hypothetique: "Hypothétique (C3)" };

function Ligne({ n, surLigne }: { n: NoeudSosa; surLigne: (id: string) => void }) {
  const nom = `${n.personne.nom?.toUpperCase() ?? "?"} ${n.personne.prenoms ?? ""}`.trim();
  return (
    <Table.Tr>
      <Table.Td style={{ fontFamily: "monospace", fontWeight: 700 }}>{n.sosa}</Table.Td>
      <Table.Td>{n.generation}</Table.Td>
      <Table.Td>
        <Text component="button" c="blue" style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }} onClick={() => surLigne(n.personne.id)}>
          {nom}
        </Text>
        <Text size="xs" c="dimmed">
          {[afficherDate(n.personne.naissance), n.personne.deces ? `† ${afficherDate(n.personne.deces)}` : ""].filter(Boolean).join(" · ") || "dates inconnues"}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge size="sm" color={n.lien === "etabli" ? "teal" : "orange"} variant="light">
          {n.lien === "etabli" ? "Établi" : "Hypothétique"}
        </Badge>
      </Table.Td>
    </Table.Tr>
  );
}

export function Ascendance() {
  const navigate = useNavigate();
  const { data } = useQuery({ queryKey: ["donnees-arbre"], queryFn: donneesArbre });
  const [filtre, setFiltre] = useState("tout");
  const racine = RACINE_DEFAUT;

  const resultat = useMemo(() => {
    if (!data) return null;
    return ascendanceSosa(racine, data.personnes, data.filiations, 8);
  }, [data, racine]);

  const noeuds = (resultat?.noeuds ?? []).filter((n) => filtre === "tout" || n.lien === filtre);
  const ouvrir = (id: string) => navigate({ to: "/individus/$individuId", params: { individuId: id } });

  return (
    <Stack p="lg" gap="md" h="100%" style={{ minHeight: 0 }}>
      <Group justify="space-between" wrap="wrap">
        <Group gap="xs">
          <IconBinaryTree2 size={22} />
          <Title order={2}>Ascendance de Vincent Tassier</Title>
        </Group>
        <SegmentedControl
          value={filtre}
          onChange={setFiltre}
          data={[
            { value: "tout", label: `Tous (${resultat?.noeuds.length ?? 0})` },
            { value: "etabli", label: `Établis (${resultat?.trouves ?? 0})` },
            { value: "hypothetique", label: `Hypothétiques (${resultat?.hypothetiques ?? 0})` },
          ]}
        />
      </Group>

      {resultat && (
        <Group gap="md" wrap="wrap">
          <Paper withBorder p="sm"><Text size="xs" c="dimmed">Profondeur</Text><Text fw={700}>{resultat.profondeur} générations</Text></Paper>
          <Paper withBorder p="sm"><Text size="xs" c="dimmed">Établis par acte</Text><Text fw={700} c="teal">{resultat.trouves}</Text></Paper>
          <Paper withBorder p="sm"><Text size="xs" c="dimmed">Hypothétiques</Text><Text fw={700} c="orange">{resultat.hypothetiques}</Text></Paper>
          <Paper withBorder p="sm"><Text size="xs" c="dimmed">Parents manquants</Text><Text fw={700}>{resultat.manquants}</Text></Paper>
        </Group>
      )}

      <Paper withBorder p="sm" bg="var(--t-fond-alerte)">
        <Group gap="xs" wrap="nowrap">
          <IconAlertTriangle size={18} />
          <Text size="sm">
            La numérotation est celle de Sosa-Stradonitz (soi = 1, père = 2, mère = 3). Un lien
            « hypothétique » n'est <b>pas</b> une filiation établie : H0 est conservée et aucun
            ancêtre C3 n'est promu automatiquement. Le détail et les démarches sont dans
            <Text component="a" href="/docs/reconstruction-vincent.md" size="sm" c="blue" ml={4}>docs/reconstruction-vincent.md</Text>.
          </Text>
        </Group>
      </Paper>

      <ScrollArea flex={1} style={{ minHeight: 0 }}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Sosa</Table.Th><Table.Th>Gén.</Table.Th><Table.Th>Personne</Table.Th><Table.Th>Preuve du lien</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {noeuds.map((n) => <Ligne key={n.sosa} n={n} surLigne={ouvrir} />)}
          </Table.Tbody>
        </Table>
        {!resultat && <Text c="dimmed" p="md">Chargement…</Text>}
      </ScrollArea>

      <Text size="xs" c="dimmed">
        Légende : {OBJ.etabli} · {OBJ.hypothetique}. Cliquer une personne ouvre sa fiche.
      </Text>
    </Stack>
  );
}

/*
 * Rigueur de la preuve sur une fiche (import Tassier & Reymond).
 * Rend visibles les champs importés que l'interface n'affichait pas :
 * grade Admiralty, statut C3 non raccordé, acte à l'appui, verdicts datés.
 * L'information n'est jamais portée par la seule couleur (texte + icône).
 */
import { Badge, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { IconBadge, IconFileCheck, IconShieldCheck, IconShieldX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

import { confianceIndividu, verdictsIndividu } from "../data/doutes";
import type { IndividuComplet } from "../data/individus";

export function RigueurFiche({ ind }: { ind: IndividuComplet }) {
  const { data: verdicts = [] } = useQuery({
    queryKey: ["verdicts", ind.id],
    queryFn: () => verdictsIndividu(ind.id),
  });
  const { data: confiance } = useQuery({
    queryKey: ["confiance", ind.id],
    queryFn: () => confianceIndividu(ind.id),
  });

  const grade = ind.grade || "C3";
  const nonRaccorde = grade === "C3" || ind.raccorde === false;
  const aUnActe = Boolean(ind.acteNaissanceId);
  if (verdicts.length === 0 && !aUnActe && !ind.id.startsWith("tas-") && !confiance) return null;

  return (
    <Paper withBorder p="md">
      <Group gap="xs" mb="sm">
        <IconShieldCheck size={18} />
        <Text fw={600}>Rigueur de la preuve</Text>
      </Group>
      <Group gap="xs" mb={verdicts.length || confiance ? "sm" : undefined}>
        {confiance && (
          <Tooltip label={`Complétion du dossier : ${confiance.manques.join(" · ") || "aucun manque"}. Mesure l'état des preuves, pas la vérité d'une filiation.`}>
            <Badge variant="light" color={confiance.score >= 80 ? "teal" : confiance.score >= 50 ? "blue" : "gray"}>
              Confiance {confiance.score}/100 · {confiance.label}
            </Badge>
          </Tooltip>
        )}
        <Badge variant="light" color={grade === "A1" ? "green" : grade === "C3" ? "gray" : "blue"}>
          Grade {grade}
        </Badge>
        {aUnActe && (
          <Badge variant="light" color="teal" leftSection={<IconFileCheck size={12} />}>
            Acte à l’appui
          </Badge>
        )}
        {nonRaccorde && (
          <Badge variant="light" color="gray" leftSection={<IconShieldX size={12} />}>
            C3 · non raccordé — jamais promu automatiquement
          </Badge>
        )}
      </Group>
      {verdicts.length > 0 && (
        <Stack gap={6}>
          {verdicts.map((v) => (
            <Text key={v.id} size="sm" c="dimmed">
              <IconBadge size={13} /> {v.date} · {v.temoin} · {v.action.replace(/_/g, " ")} — {v.note}
            </Text>
          ))}
        </Stack>
      )}
    </Paper>
  );
}

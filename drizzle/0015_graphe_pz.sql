--> Graphe Geneanet des 653 ancêtres : liens de parenté et d'union (grade C3, jamais promu).
CREATE TABLE `pz_lien` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`source_id` text NOT NULL,
	`cible_id` text NOT NULL,
	`cree_le` text DEFAULT (datetime('now')) NOT NULL,
	FOREIGN KEY (`source_id`) REFERENCES `individu`(`id`) ON DELETE cascade,
	FOREIGN KEY (`cible_id`) REFERENCES `individu`(`id`) ON DELETE cascade
);--> statement-breakpoint
CREATE UNIQUE INDEX `pz_lien_unique` ON `pz_lien` (`type`,`source_id`,`cible_id`);--> statement-breakpoint
CREATE INDEX `pz_lien_source_idx` ON `pz_lien` (`source_id`);--> statement-breakpoint
CREATE INDEX `pz_lien_cible_idx` ON `pz_lien` (`cible_id`);

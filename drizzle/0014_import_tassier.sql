--> Import de l'arbre Tassier & Reymond : traçabilité des preuves et rigueur OSINT.
--> Ces champs n'existaient pas dans Tabularium ; ils portent les règles H0 / C3 / A1-témoin.

ALTER TABLE `page` ADD COLUMN `sha256` text;--> statement-breakpoint
ALTER TABLE `individu` ADD COLUMN `grade` text DEFAULT 'C3' NOT NULL;--> statement-breakpoint
ALTER TABLE `individu` ADD COLUMN `raccorde` integer DEFAULT false NOT NULL;--> statement-breakpoint
CREATE TABLE `verdict` (
	`id` text PRIMARY KEY NOT NULL,
	`cible_id` text NOT NULL,
	`titre` text NOT NULL,
	`temoin` text NOT NULL,
	`date` text NOT NULL,
	`action` text NOT NULL,
	`note` text,
	`cree_le` text DEFAULT (datetime('now')) NOT NULL,
	FOREIGN KEY (`cible_id`) REFERENCES `individu`(`id`) ON UPDATE no action ON DELETE cascade
);--> statement-breakpoint
CREATE INDEX `verdict_cible_idx` ON `verdict` (`cible_id`);--> statement-breakpoint
CREATE INDEX `verdict_date_idx` ON `verdict` (`date`);

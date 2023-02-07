import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  BelongsToMany,
  HasMany,
  DataType
} from "sequelize-typescript";
import Chatbot from "./Chatbot";
import User from "./User";
import UserQueue from "./UserQueue";

import Whatsapp from "./Whatsapp";
import WhatsappQueue from "./WhatsappQueue";

@Table
class Queue extends Model<Queue> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @AllowNull(false)
  @Unique
  @Column
  color: string;

  @Column
  greetingMessage: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(() => Whatsapp, () => WhatsappQueue)
  whatsapps: Array<Whatsapp & { WhatsappQueue: WhatsappQueue }>;

  @BelongsToMany(() => User, () => UserQueue)
  users: Array<User & { UserQueue: UserQueue }>;

  @HasMany(() => Chatbot)
  chatbots: Chatbot[];

  @Column
  startWorkHour: string;

  @Column
  endWorkHour: string;

  @AllowNull
  @Column(DataType.TEXT)
  startWorkHourWeekend: string;

  @AllowNull
  @Column
  endWorkHourWeekend: string;

  @AllowNull
  @Column(DataType.TEXT)
  startWorkHourWeekendD: string;

  @AllowNull
  @Column
  endWorkHourWeekendD: string;

  @Column
  defineWorkHours: string;

  @Column
  monday: boolean;

  @Column
  tuesday: boolean;

  @Column
  wednesday: boolean;

  @Column
  thursday: boolean;

  @Column
  friday: boolean;

  @Column
  saturday: boolean;

  @Column
  sunday: boolean;

  @Column(DataType.TEXT)
  outOfWorkMessage: string;
}

export default Queue;

import { Exclude, Expose, Transform } from 'class-transformer'

@Exclude()
export class UserTransformer {
  @Expose()
  firstName: string

  @Expose()
  lastName: string

  @Expose()
  login: string

  @Expose()
  email: string

  @Expose()
  phoneNumber: string

  @Expose()
  role: string

  @Expose()
  authProvider: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  @Transform(({ value }) => undefined, { toPlainOnly: true })
  password: string

  @Transform(({ value }) => undefined, { toPlainOnly: true })
  facebookId: string

  @Transform(({ value }) => undefined, { toPlainOnly: true })
  googleId: string
}
